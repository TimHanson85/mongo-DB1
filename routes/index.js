var express = require('express');
var router = express.Router();
var app = require('../app.js');


  /* GET home page. */
  router.get('/', function(req, res, next) {
     res.render('index', { title: 'Express' });
   });

  
  //homepage handler++++++++++++++++++++
  router.get('/', function(request, response) {
    response.render('index', {});
    // index.jade needs a form to submit a URL for shortening
  });

  //post handler for submiting form+++++++++++
  router.post('/', function(request, response) {
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

  module.exports = router;
