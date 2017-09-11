var dbLayer = require('./dataLayer')
var express = require('express')
var app = express()
var CORS = require('cors')
assert = require('assert')

// Body parsers for handling POST request data
var bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
app.use(new CORS())

// Define routes
// app.post('/registerUser', dbLayer.registerUser)
app.get('/getOrders', dbLayer.getOrders)
app.post('/placeOrder', dbLayer.placeOrder)
app.post('/cancelOrder/:id', dbLayer.cancelOrder)
app.get('/getMealOptions', dbLayer.getMealOptions)
app.post('/updateMealOption', dbLayer.updateMealOption)
app.post('/acceptOrder/:id', dbLayer.acceptOrder)

// Start server at port 3000
var server = app.listen(3000, function () {
  console.log('listening to port 3000...')
})
