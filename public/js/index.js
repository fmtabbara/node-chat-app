const socket = io();

socket.on('connect', function() {
  console.log('Connected to the server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New message', message);

  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.emit(
  'createMessage',
  {
    from: 'Frank',
    text: 'Hi'
  },
  function(serverMessage) {
    console.log('Got it...', serverMessage);
  }
);

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: $('[name=message]').val()
    },
    function() {}
  );
});
