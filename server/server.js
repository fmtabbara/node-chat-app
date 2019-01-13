const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('New Connection');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app'
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user has joined the chat'
  });

  socket.on('createMessage', newMessage => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdat: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdat: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from the browser');
  });
});

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
