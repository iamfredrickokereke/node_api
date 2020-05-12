// create standardized response

function respond(res, next, status, data, http_code) {
    var response = {
        'status' : status,
        'data' : data
    }
    res.writeHead(http_code, 'content-type', 'application/json');
    res.end(JSON.stringify(response));
    return next()

}

function success(res, next, data) {
    respond(res, next, 'success', data, 200)
}
function failure(res, next, data, http_code) {
    respond(res, next, 'oops, an error occured', data, http_code)
    
}

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
    
    success(res, next, users)
})

server.get('/user/:id', (req, res, next) =>{
    success(res,next, users[parseInt(req.params.id)])
})



//create new users under the user route with new id

server.post('/user', (req, res, next) =>{

    var user = req.params;
	max_user_id++;
    user.id = max_user_id;
    user.name = req.params.name;
    user.email = req.params.email;
	users[user.id] = user;
	users[user.name] = user;
	users[user.email] = user;
	success(res, next, user)
})


server.put('/user/:id', (req, res, next) =>{

    var user = users[parseInt(req.params.id)];

    var updates = req.params;

    for (const field in updates) {
        
             user[field] = updates[field];
    }
	
	success(res, next, user)
})

server.del('/user/:id', (req, res, next) =>{
    delete users[parseInt(req.params.id)];
    success(res, next, { status: 'deleted successfully', 'content' : []})
})



server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});