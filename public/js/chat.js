$(function() {
  var socket = io();
  var $username = $('#username');
  var $usernameButton = $('header button[name="addUsername"]');
  var $message = $('header p');
  var signedIn = false;

  /* Socket functionality to create a username */
  $('header button[name="addUsername"]').click(function(event) {
    if ($username.val().length > 0) {
      $usernameButton.hide();
      $message.text('Welcome ' + $username.val() + '!');
      $username.attr('disabled', true);
      $('main').show();
      socket.emit('user enter', $username.val());
      signedIn = true;
    }
  });

  socket.on('user enter', function(msg) {
    if (signedIn) {
      $('#messages').append($('<li>').text('---' + msg + ' just entered the chat room.'));
    }
  });

  /* Socket functionality to send a chat message */
  $('form').submit(function(event){
    event.preventDefault();
    $msg = $('#m');
    if ($msg.val().length > 0) {
      socket.emit('chat message', $username.val() + ': ' + $msg.val());
      $msg.val('');
    }
  });

  socket.on('chat message', function(msg){
    if (signedIn) {
      $('#messages').append($('<li>').text(msg));
    }
  });

  /* Socket functionality to show user leaving */
  $(window).bind("beforeunload", function() {
    socket.emit('user leave', $username.val());
  });

  socket.on('user leave', function(msg) {
    if (signedIn) {
      $('#messages').append($('<li>').text('---' + msg + ' just left the chat room.'));
    }
  });

  /* Socket functionality to show user typing */
  $('#m').keypress(function() {
    socket.emit('user typing', $username.val());
  })

  socket.on('user typing', function(msg) {
    if (signedIn) {
      $message.text(msg + ' is currently typing.');
    }
  })
});
