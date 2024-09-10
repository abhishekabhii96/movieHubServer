//import dotenv  (to load environment variable)
require('dotenv').config()

//import express
const express = require('express')

//import cors
const cors = require('cors')

//import router
const router = require('./routes')

//import connection.js
require('./connection')


//create express server
const movieServer = express()

//use of cors (to communicate with view)
movieServer.use(cors())

//use json() method - returns a middleware which can parse json formate
movieServer.use(express.json())

//use router
movieServer.use(router)

// to export upload folder from the server side to use in the client side
// firt argument should be the name in which we are using the folder in the client side
// seond arg - static method to export the folder
// static method should have the path of the export folder
movieServer.use('/uploads',express.static('./uploads'))



//set port for the server
PORT = 4000 || process.env.PORT

//listen to the port - to resolve the request
movieServer.listen(PORT,()=>{
  console.log(`server running successfully at port number :${PORT}`);
})


