'use strict';

/*
You will have two applications representing two different vendors. Note that most of the code between these two will be the same. Think about ways to modularize things so you are being efficient! Each vendor application should have a vendor name attached to it, for example flower-shop and candy-shop. When these vendor applications start up, they should:

Emit a subscribe event, indicating that they want to subscribe to a certain queue. This queue is typically equivalent to the vendor name.
Register a listener for the delivered event, which will check the incoming delivery data and emit a received event if the data was successfully received
Emit a getAll event, indicating that they want to get any messages on the queue they’ve subscribed to
*/