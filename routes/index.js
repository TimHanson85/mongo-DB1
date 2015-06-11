var express = require('express');
var router = express.Router();
var app = require('../app.js');
var uuid = require('node-uuid');


// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://127.0.0.1:27017/test';
 

// MongoClient.connect(url, function(err, db){
//  if (err) throw err;
//  app.set('mongo', db); 
//  console.log("Connected to mongo");
// });
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


  
  //homepage handler++++++++++++++++++++
  router.get('/', function(request, response) {
    response.render('index', {});
    // index.jade needs a form to submit a URL for shortening
  });


  //post handler for submiting form+++++++++++
  router.post('/', function(request, response) {
    var id = uuid.v4();
    var userInput = document.body.url;
    var collection = db.collection('urls');
    collection.insert({/*info you generate*/}, function(err, docs) {
      response.redirect('/info/' + shortUrl);
    });
  });

  //Get handler+++++++++++++++++++++
  router.get('/info/:shortUrl', function(request, response) {
    var collection = db.collection('urls'),
        shortUrl = request.params.shortUrl;
    collection.find().toArray({'shortened': shortUrl}, function(err, url) {
      response.render('info', {url: url});
    });
  });

  //get handler for shotening url+++++++
  router.get('/:shortUrl', function(request, response) {
    var collection = db.collection('urls'),
        shortUrl = request.params.shortUrl;
    collection.find({'shortened': shortUrl}, function(err, url) {
      response.redirect(url.target);
    });
  });
/***********************************
*/


{
  "_id": id,
  "shortened": "click here for you link",
  "target": userInput,
  "clicks": 8,
  "last_click": "2015-01-13T16:42:00"
}


/*
************************************/


module.exports = router;












