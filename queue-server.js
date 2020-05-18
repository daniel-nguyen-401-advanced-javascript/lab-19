'use strict';

/* 
This application will hold your queue server, running on port 3001. It should store some object/array containing the different queues in the system. When sockets connect to this socket server, a few actions should take place:

The server should log to the console a connected message, with the socket id shown
The server should attach event listeners upon the socket for the following events:
received - indicates that a socket received a message from the server, so that it can be deleted from the server
getAll - indicates that a socket wants to get all messages in the queue it’s looking for
subscribe - indicates that a socket wants to subscribe to a queue. The server will put the socket in its own room
delivered - indicates that our API server received a delivery POST request and needs to communicate this to the correct vendor. The queue server will emit another delivered event to the correct client
The delivered event/message will act as the entry point for the data flow - our API server will emit this event when an HTTP POST request is heard.
*/

const io = require('socket.io')(3001);

io.on('connection', (socket) => {
  console.log('connected to', socket.id);
});