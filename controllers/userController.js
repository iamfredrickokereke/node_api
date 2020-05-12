var helper = require('../config/helperFunction')
   
var users = {};
var max_user_id = 0;
 
module.exports = (server) =>{
    
    // retrieve default route path

    server.get('/', (req, res, next) =>{
       helper.success(res, next, users)
    })

    server.get('/user/:id', (req, res, next) =>{

        req.assert('id', 'id is required and must be numeric').notEmpty().isInt();

        var error = req.validationErrors();
         
        if (error) {
            helper.failure(res, next, error[0], 404)
        }

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
        helper.success(res, next, user)
    })


    server.put('/user/:id', (req, res, next) =>{
        
        if (typeof(users[req.params.id]) == 'undefined') {
            helper.failure(res, next, 'Ouch, we don\'t know recognice you', 404)
        }
        var user = users[parseInt(req.params.id)];
        
        var updates = req.params;
        
        for (const field in updates) {
            
            user[field] = updates[field];
        }
        
        helper.success(res, next, user)
    })

    server.del('/user/:id', (req, res, next) =>{
        if (typeof(users[req.params.id]) == 'undefined') {
            helper.failure(res, next, 'Ouch, we don\'t know recognice you', 404)
        }

        delete users[parseInt(req.params.id)];
        
        helper.success(res, next, { status: 'user deleted successfully', 'content' : []})
    })


}