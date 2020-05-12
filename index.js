var restify = require('restify');



var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.jsonBodyParser());
server.use(restify.plugins.bodyParser());


var users = {};
var max_user_id = 0;

// retrieve default route path

server.get('/', (req, res, next) =>{
    res.writeHead(200, {'Content-Type' : 'Application/json'});
    res.end(JSON.stringify(users));

    return next()
})


//create new users under the user route with new id

server.post('/user', (req, res, next) =>{

    var user = req.params;
	max_user_id++;
	user.id = max_user_id;
	users[user.id] = user;
	res.setHeader('content-type', 'application/json');
	res.writeHead(200);
	res.end(JSON.stringify(user));
	return next();


    
})



server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});