'use strict';

/*
You will have two applications representing two different vendors. Note that most of the code between these two will be the same. Think about ways to modularize things so you are being efficient! Each vendor application should have a vendor name attached to it, for example flower-shop and candy-shop. When these vendor applications start up, they should:

XEmit a subscribe event, indicating that they want to subscribe to a certain queue. This queue is typically equivalent to the vendor name.

XRegister a listener for the delivered event, which will check the incoming delivery data and emit a received event if the data was successfully received

XEmit a getAll event, indicating that they want to get any messages on the queue they’ve subscribed to
*/

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

let vOneOrders = [];

socket.emit('subscribe', 'vendor01');
socket.emit('get-all', 'vendor01');
// to respond to get-all,
// make queue event that pulls all current orders

//maybe change this one to queue event
//this event should log "ty for delivering"
// then should remove order from queue? then update queue?
//then emit 'received', 'vendor01'//[0]//or payload?
socket.on('current-orders', payload => {
  console.log('current unhandled orders', payload);
  socket.emit('receivedv1', payload);
  vOneOrders = payload;
});

socket.on('delivered', payload => {
  if (vOneOrders.length > 0)
  console.log('Thank you for delivering order', payload);
});

