$(function() {
  var socket = io();

  $('form').submit(function(event){
    event.preventDefault();
    $msg = $('#m');
    if ($msg.val().length > 0) {
      socket.emit('chat message', $msg.val());
      $msg.val('');
    }
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
});
