var restify = require('restify');


var server = restify.createServer();

var users = {};
var max_user_id = 0;

server.get('/', (req, res, next) =>{
    res.writeHead(200, {'Content-Type' : 'Application/json'});
    res.end(JSON.stringify(users));

    return next()
})

server.post('/user', (req, res, next) =>{

    var user = req.params;
    max_user_id++;

    user.id = max_user_id;

    users[user.id] = user;
    // console.log(typeof(user));
    

    res.writeHead(200, {'Content-Type' : 'Application/json'});
    res.end(JSON.stringify(user));

    return next()
})



server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});