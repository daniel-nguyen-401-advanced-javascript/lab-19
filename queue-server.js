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

console.log('Message Queue Server up and running on 3001');

let queue = {
  vOne: [],
  vTwo: []
}

io.on('connection', (socket) => {
  console.log('Connected', socket.id);

// this is now a delivered event
// emit queue event?
  socket.on('delivered', (payload) => {
    // console.log('saving order', payload);
    if (payload.vendor === 'vendor01') {
      queue.vOne.push(payload.orderID);
      io.to('vendor01').emit('current-orders', queue.vOne);
    } else if (payload.vendor === 'vendor02') {
      queue.vTwo.push(payload.orderID);
      io.to('vendor02').emit('current-orders', queue.vTwo);
    }
  });

  //maybe should emit queue event, queue[payload]
  socket.on('get-all', payload => {
    if (payload === 'vendor01'){
      socket.emit('current-orders', queue.vOne);
    } else if (payload === 'vendor02'){
      socket.emit('current-orders', queue.vTwo);
    }
  });

  socket.on('subscribe', payload => {
    // socket.join(payload);
    if (payload === 'vendor01'){
      socket.join('vendor01');
      console.log('vendor01 joined room');
    } else if (payload === 'vendor02'){
      socket.join('vendor02');
      console.log('vendor02 joined room');
    }
  });

  socket.on('receivedv1', payload => {
    //figure out if order came from v1 or v2
    //delete that item from queue
    //don't need to emit anything?
      io.to('vendor01').emit('delivered', payload);
      queue.vOne.shift();
      // io.to('vendor01').emit('current-orders', queue.vOne);
   
  });

  socket.on('receivedv2', payload => {
  
    io.to('vendor02').emit('delivered', payload);
    queue.vTwo.shift();
  });

});
