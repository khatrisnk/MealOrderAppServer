# MealOrderAppServer
This is a simple server application using node.js. Here I have created services for a sample app [LunchOrderApp](https://github.com/anandprajapati1/LunchOrderApp).
In this example you will see REST services to perform basic CRUD operations. I have used Mongodb as database.

## Pre-requisites
Node and Mongodb should be installed.

## Getting Started
### Installing packages
Clone repository and run following command in command prompt/terminal.
```
npm install
```
This will install dependencies in your local environment.


### Start mongo server
First of all, open mongodb/mongo.conf and set you local IP address against which you your mongo database server will be running.
For more on mongo configuration option, visit [Mongodb docs](https://docs.mongodb.com/manual/reference/configuration-options/#configuration-file)
Now run following command in command prompt/terminal(in root folder)
```
mongod --config=mongodb/mongo.conf
```
This will start mongo database server and it keeps running until you manually stops it. This server will be running at port mentioned in **mongo.conf** file(in our case it will be running at **localhost:27170**) Now, we need a databse! So we are gonna run following query in mongo shell -

```javascript
// Create database with name 'LunchBooking'
use LunchBooking

// Create collection
db.createCollection('Users',{autoIndexId:true})
db.createCollection('MealOptions',{autoIndexId:true})
db.createCollection('Orders',{autoIndexId:true})

// insert default data
db.MealOptions.insertMany([
    {
        'OptionDetail':'Rajma Rice',
        'Price':40.0,
        'IsActive':true
    },
    {
        'OptionDetail':'Kadhi Rice',
        'Price':50.0,
        'IsActive':true
    },
    {
        'OptionDetail':'Thali - Dal, Sabji, 3 Roti',
        'Price':50.0,
        'IsActive':true
    },
    {
        'OptionDetail':'Thali - Dal, 2-Sabji, 4-Roti, Rice',
        'Price':60.0,
        'IsActive':true
    },
    {
        'OptionDetail':'Thali - Dal, 2-Sabji, 4-Roti, Rice',
        'Price':70.0,
        'IsActive':true
    },
    {
        'OptionDetail':'Thali - Chicken, 4-Roti, Rice',
        'Price':90.0,
        'IsActive':true
    }
])
```
Though you can change your database name but make sure you put same name in connection url in dataLayer.js
```javascript
// Connection URL to database
var url = 'mongodb://localhost:27170/LunchBooking'
```
### Start web server
Now open another command prompt/terminal(in root folder) and run following command -
```
npm start
```
This will start node server running on port 3000.

### Testing services
There are various tools to test restful services. Some popular ones are - **Postman, Advanced REST client(for chrome)** etc.
OR
To test whether server is working fine, just hit any GET type service in your browser. *Note - You can find relative service paths in app.js file*
`Eg - http://localhost:3000/getMealOptions`
Initially you don't have any record, you'll get an empty array in response. You can check it in network panel of browser.

To try inserting new record usin **placeOrder** service. Use following sample data-
```javascript
{"OptionId":"59a1a5131cfe5d947d87beb3","Count":2,"Remarks":"","IsAccepted":false,"IsPaid":false,"IsActive":true,"CreatedOn":"2017-09-17T06:08:06.960Z","CreatedBy":"some@some.com","_id":"59be1146de39eb32644e100a"}
```

## Consuming services in Web Application
You can find a client side application developed using Angular 2 **[here](https://github.com/anandprajapati1/LunchOrderApp)**. You can use that for better understanding of integrating your service to client side app.



Thanks!
