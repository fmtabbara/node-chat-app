const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static('public'));

//App Body

io.on('connection', socket => {
  console.log('New Connection');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    console.log(
      `User ${params.name} joined room ${params.room}. Users in room:`,
      users.getUserList(params.room)
    );
    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat app')
    );

    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        generateMessage('Admin', `${params.name} has joined the chat`)
      );
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        'newMessage',
        generateMessage(user.name, message.text)
      );
    }

    callback();
  });

  socket.on('createLocationMessage', coords => {
    const user = users.getUser(socket.id);
    io.to(user.room).emit(
      'newLocationMessage',
      generateLocationMessage(user.name, coords.latitude, coords.longitude)
    );
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);
    console.log(
      `User ${user.name} left the room ${user.room}. Users in room:`,
      users.getUserList(user.room)
    );
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit(
        'newMessage',
        generateMessage('Admin', `${user.name} has left the chat`)
      );
    }
    console.log('User disconnected from the browser');
  });
});

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
