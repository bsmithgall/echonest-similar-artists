'use strict';

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname);

app.route('/')
  .get(function(req, res) {
    res.send('public/index.html');
  })
  .post(function(req, res) {
    console.log(req, res)
  });

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});
