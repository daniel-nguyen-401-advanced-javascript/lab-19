'use strict';
/*
This application will be both an Express API server running on port 3000 and a socket client connected to the queue server. It should have one primary route defined, POST /delivery/:vendor/:order-id. In this route, :vendor is the name of the vendor client this delivery pertains to, and :order-id is some random collection of letters and digits that represents that order id.

When this POST route is hit with a request, the API server should emit a delivered event (which will be handled within the queue server). This even should have a payload with the data that matches the following format:

{
  vendor: 'flower-shop',
  orderId: '12345-ABCD'
}
It should then return a response of status 200, representing that the delivery was noted in the system.
*/

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.status(200);
  res.send('Homepage');
});

//create route for client ('customer') to write an order

app.post('/delivery/:vendor/:order', (req, res, next) => {
  let order = {
    vendor: req.params.vendor,
    orderID: req.params.order,
  };

  //should this (order-created) be 'delivered'?
  //yes delivered
  //also have delivered event log 'delivery', order
  if(!(order.vendor === 'vendor01' || order.vendor === 'vendor02')){
    res.status(400);
    res.send('Incorrect vendor format');
  } else {
    socket.emit('delivered', order);
    console.log('delivery', order);
    res.status(200);
    res.send('Sent order to queue');
  }

  //send order to the queue
  //when queue gets it, return a response
});

app.listen(3000, () => {
  console.log('API server is up and running on port 3000');
});
