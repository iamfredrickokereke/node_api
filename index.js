
var restify = require('restify');

var server = restify.createServer();

var config = require('./config/dbConnection')

var mongoose = require('mongoose');

mongoose.connect(config.getMongoConnection(), { useUnifiedTopology: true,  useNewUrlParser: true} )

var setupController = require('./controllers/setupController');

var userController = require('./controllers/userController');

var restifyValidator = require('restify-validator');


setupController(server, restify, restifyValidator);

userController(server);


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});