

var restify = require('restify');

var server = restify.createServer();



var users = {};
var max_user_id = 0;


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});