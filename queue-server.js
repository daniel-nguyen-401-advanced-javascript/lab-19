'use strict';

/* 
This application will hold your queue server, running on port 3001. It should store some object/array containing the different queues in the system. When sockets connect to this socket server, a few actions should take place:

XThe server should log to the console a connected message, with the socket id shown

The server should attach event listeners upon the socket for the following events:

received - indicates that a socket received a message from the server, so that it can be deleted from the server

XgetAll - indicates that a socket wants to get all messages in the queue it’s looking for

Xsubscribe - indicates that a socket wants to subscribe to a queue. The server will put the socket in its own room

delivered - indicates that our API server received a delivery POST request and needs to communicate this to the correct vendor. The queue server will emit another delivered event to the correct client

The delivered event/message will act as the entry point for the data flow - our API server will emit this event when an HTTP POST request is heard.
*/

const io = require('socket.io')(3001);

let queue = {
  vOne: [],
  vTwo: []
}

io.on('connection', (socket) => {
  console.log('connected to', socket.id);

  //should this be 'delivered'?
  socket.on('order-created', (payload) => {
    console.log('saving order', payload);
    
    if (payload.vendor === 'vendor01') {
      queue.vOne.push(payload.orderID);
      io.to('vendor01').emit('current-orders', queue.vOne);
    } else if (payload.vendor === 'vendor02') {
      queue.vTwo.push(payload.orderID);
      io.to('vendor02').emit('current-orders', queue.vTwo);
    }
  });

  socket.on('get-all', payload => {
    if (payload === 'vendor01'){
      socket.emit('current-orders', queue.vOne);
    } else if (payload === 'vendor02'){
      socket.emit('current-orders', queue.vTwo);
    }
  });

  socket.on('subscribe', payload => {
    if (payload === 'vendor01'){
      socket.join('vendor01');
    } else if (payload === 'vendor02'){
      socket.join('vendor02');
    }
  });

  socket.on('received', payload => {
    //figure out if order came from v1 or v2
    //delete that item from queue
    if (payload.vendor === 'vendor01'){
      queue.vOne.shift();
      io.to('vendor01').emit('current-orders', queue.vOne);
    } else if (payload.vendor === 'vendor02'){
      queue.vTwo.shift();
      io.to('vendor02').emit('current-orders', queue.vTwo);
    }
  });


});
