# Message Queues

In this lab, you’ll combine Express servers and sockets, to have a communication network over both HTTP and TCP. This lab will only be focusing on order delivery, and not on order creation or transit. For this lab, you may work in a pair if you would like, just be sure to document that on your submitted README file.
    
## Links
    
- [pull request](https://github.com/daniel-nguyen-401-advanced-javascript/lab-19/pull/1)
    
## Challenge
    
For this lab, you should have four independent applications running on terminal and communicating with one another. These applications will be:

* The message queue server (socket server)
* The delivery API server (socket client, express server)
* Vendor 01 (socket client)
* Vendor 02 (socket client)

The delivery API server should expose an HTTP POST route of the format `/delivery/:vendor/:order-id`. This route will not have any body parameters, and when triggered using Postman or a similar service, it should tell the appropriate vendor that an order was delivered. If that vendor happens to be disconnected, the message should be saved and sent when the vendor is back online.

## Approach & Efficiency

- 

# API

- 
    
## Testing Instructions
    
- open 4 terminal windows
* window 1 should be `queue-server.js`
* window 2 should be `delivery_api/api.js`
* window 3 should be `vendor-01/vendor-01.js`
* window 4 should be `vendor-02/vendor-02.js`
- run `npm start`, in order, on `queue-server`, then `api`, then `vendor-01`, then `vendor-02`
- that should get your logs going properly
- fire up Postman or Insomnia and write a POST route to: http://localhost:3000/delivery/(vendor)/(order)
- replace (vendor) with either `vendor01` or `vendor02`
- replace (order) with any string
- You should see the outputs outlined in the lab description
## UML
![lab-19-uml](/lab-19-uml.jpg)
