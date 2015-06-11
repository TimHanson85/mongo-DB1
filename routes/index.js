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
      'target': userInput}, function(err, docs) {
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
  router.get('/:shortUrl', function(request, response) {
    var db = app.get('mongo'); 
    var collection = db.collection('urls'),
        shortUrl = request.params.shortUrl;
    collection.find({'shortened': shortUrl}, function(err, url) {
      response.redirect(url.target);
    });
  });
  /***********************************
  */


//"clicks": 8
//"last_click": "2015-01-13T16:42:00"

/*
************************************/


module.exports = router;












