var helper = require('../config/helperFunction')

module.exports = (server) =>{
    
    // retrieve default route path

    server.get('/', (req, res, next) =>{
        
        success(res, next, users)
    })

    server.get('/user/:id', (req, res, next) =>{

        if (typeof(users[req.params.id]) == 'undefined') {
            failure(res, next, 'we don\'t recognise this user', 404)
        }{
            success(res,next, users[parseInt(req.params.id)])
        }
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
        
        if (typeof(users[req.params.id]) == 'undefined') {
            failure(res, next, 'Ouch, we don\'t know recognice you', 404)
        }
        var user = users[parseInt(req.params.id)];
        
        var updates = req.params;
        
        for (const field in updates) {
            
            user[field] = updates[field];
        }
        
        success(res, next, user)
    })

    server.del('/user/:id', (req, res, next) =>{
        if (typeof(users[req.params.id]) == 'undefined') {
            failure(res, next, 'Ouch, we don\'t know recognice you', 404)
        }

        delete users[parseInt(req.params.id)];
        
        success(res, next, { status: 'user deleted successfully', 'content' : []})
    })


}