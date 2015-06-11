var express = require('express');
var router = express.Router();
var app = require('../app.js');
var uuid = require('node-uuid');

  
  //homepage handler++++++++++++++++++++
  router.get('/', function(request, response) {
    var db = app.get('mongo'); 
    response.render('index', {});
    // index.jade needs a form to submit a URL for shortening
  });


  //post handler for submiting form+++++++++++
  router.post('/', function(request, response) {
    var db = app.get('mongo'); 
    var shortUrl = uuid.v4();
    var userInput = request.body.url;
    var collection = db.collection('urls');
    
    collection.insert({
      'shortened': shortUrl,
      'target': userInput,
      'clicks': 0,
      'last_click_time': ""},
       function(err, docs) {
    response.redirect('/info/' + shortUrl);
    });
  });

  //Get handler+++++++++++++++++++++
  router.get('/info/:shortUrl', function(request, response) {
    var db = app.get('mongo'); 
    var collection = db.collection('urls');
    var shortUrl = request.params.shortUrl;
    collection.find({'shortened': shortUrl}).toArray(function(err, url) {
      response.render('info', {url: url[0]});
    });
  });

  //get handler for shotening url+++++++
<<<<<<< HEAD
  router.get('/:shortUrl', function(request, response) {
    var db = app.get('mongo'); 

    var currentDate = new Date();
    var dateTime = "Posted at: " + currentDate.getDate() + "/" + (currentDate.getMonth()+1)  + "/" + currentDate.getFullYear() + " @ " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

    var collection = db.collection('urls'),
        shortUrl = request.params.shortUrl;
    collection.find({'shortened': shortUrl}, function(err, url) {
      response.redirect(url.target);
=======
  router.get('/redirect/:shortUrl', function(request, response) {
    var db = app.get('mongo');
    var collection = db.collection('urls');
    var shortUrl = request.params.shortUrl;
    
    var currentDate = new Date(); 
    var dateTime = "Clicked at: " + currentDate.getDate() + "/" + (currentDate.getMonth()+1)  + "/" + currentDate.getFullYear() + " @ " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    
    collection.find({'shortened': shortUrl}).toArray(function(err, url) {
      console.log(url);
      collection.update(
        {'shortened': shortUrl},
        {$inc: {clicks: 1}, $set: {last_click_time: dateTime}}
      );
      response.redirect('http://'+url[0].target);
>>>>>>> master
    });
  });


  /***********************************
  */


//"clicks": 8
//"last_click": "2015-01-13T16:42:00"

/*
************************************/


module.exports = router;












