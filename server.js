var express = require('express');
var bodyParser = require('body-parser');

// Create express app
var app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

var dbConfig = require('./config/db.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
  console.log("Whoa! Danger! Could not connect to the database. Exiting now...");
  process.exit();
});

mongoose.connection.once('open', function() {
  console.log("Hey we are successfully connected to the thought database.");
})

// Define a simple route
app.get('/', function(req, res) {
  res.json({"message": "Welcome to ThoughtBank API."})
});

// Require thought routes
require('./app/routes/thought.routes.js')(app);

// Listen for requests
app.listen(3000, function() {
  console.log("Server is listening on port 3000");
});
