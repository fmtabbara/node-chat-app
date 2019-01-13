const socket = io();

socket.on('connect', function() {
  console.log('Connected to the server');

  socket.emit('createMessage', {
    from: 'User1',
    text: 'This is a new email'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);
});
