var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID

// Connection URL to database
var url = 'mongodb://localhost:27170/LunchBooking'

// exports.registerUser = function (req, res) {
//   MongoClient.connect()
//   MongoClient.connect(url, function (err, db) {
//     console.log('registerUser called')

//     var userDetail = req.body
//     if (userDetail.length <= 0) {
//       console.log('No record to insert')
//       customCallback('No record to insert', res)
//       return
//     }

//     var collection = db.collection('Users')
//     collection.insertMany(userDetail, function (err, result) {
//       customCallback(result.ops, res)
//     })
//     db.close()
//   })
// }
exports.getOrders = function (req, res) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, db) {
    // write message to console if condition fails
    assert(err == null)
    console.log('getOrders called')

    var collection = db.collection('Orders')
    var start = new Date()
    start.setHours(0, 0, 0, 0)
    var end = new Date()
    end.setHours(23, 59, 59, 999)

    collection.aggregate([
      {
        $lookup: {
          from: 'MealOptions',
          localField: 'OptionId',
          foreignField: '_id',
          as: 'OrderedMeal'
        }
      },
      {
        $match: {
          $and: [
            {IsActive: true},
            {CreatedOn: {
                $lt: end,
                $gt: start
            }}
          ]
        }
      }
    ]).toArray(function (err, items) {
      // if (!items || !items.length)
      //   console.log('No records found')
      // else
      //   console.log('Found the ' + items.length + ' records')
      customCallback(items, res)
    })
    db.close()
  })
}
exports.placeOrder = function (req, res) {
  MongoClient.connect()
  MongoClient.connect(url, function (err, db) {
    console.log('placeOrder called')

    var orderDetail = req.body
    if (orderDetail.length <= 0) {
      console.log('No record to insert')
      customCallback('No record to insert', res)
      return
    }

    var collection = db.collection('Orders')
    collection.insert(orderDetail,{w:1}, function (err, result) {
      assert(err == null)
      customCallback(result.ops[0], res)
    })
    db.close()
  })
}
exports.cancelOrder = function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var d = req.body
    if (d.length <= 0) {
      console.log('No record to update')
      customCallback('No record to update', res)
      return
    }
    console.log('cancelOrder called for ' + d._id)

    var collection = db.collection('Orders')
    collection.findOneAndUpdate({
      _id: ObjectId(d._id)
    }, {
      $set: {
        'IsActive': false
      }
    }, function (err, result) {
      customCallback('Updated one record', res)
    })
    db.close()
  })
}
exports.updateMealOption = function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var d = req.body
    if (d.length <= 0) {
      console.log('No record to update')
      customCallback('No record to update', res)
      return
    }
    console.log('updateMealOption called for ' + d._id)

    var collection = db.collection('MealOptions')
    collection.findOneAndUpdate({
      _id: ObjectId(d._id)
    }, {
      $set: {
        'IsActive': false
      }
    }, function (err, result) {
      customCallback('Updated one record', res)
    })
    db.close()
  })
}
exports.getMealOptions = function (req, res) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, db) {
    // write message to console if condition fails
    assert(err == null)
    console.log('getMealOptions called')

    var collection = db.collection('MealOptions')
    collection.find({
      'IsActive': true
    }).toArray(function (err, items) {
      customCallback(items, res)
    })
    db.close()
  })
}
exports.acceptOrder = function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var d = req.body
    if (d.length <= 0) {
      console.log('No record to update')
      customCallback('No record to update', res)
      return
    }
    console.log('acceptOrder called for ' + d._id)

    var collection = db.collection('Orders')
    collection.findOneAndUpdate({
      _id: ObjectId(d._id)
    }, {
      $set: {
        'IsAccepted': true
      }
    }, function (err, result) {
      customCallback('Updated one record', res)
    })
    db.close()
  })
}

var customCallback = function (d, response) {
  // send json data in response
  response.send(d)
}
