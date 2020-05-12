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

        var errors = req.validationErrors();
         
        if (typeof(users[req.params.id]) == 'undefined') {
            helper.failure(res, next, 'we don\'t recognise this user', 404);

            if (errors) {
                helper.failure(res, next, errors[0], 400);
            }
        }{
            helper.success(res, next, users[parseInt(req.params.id)])
        }
    })



    //create new users under the user route with new id

    server.post('/user', (req, res, next) =>{
        req.assert('firstname', 'Firstname is required.').notEmpty();
        req.assert('lastname', 'Lastname is required.').notEmpty();
        req.assert('email', 'Email is required and must be valid').notEmpty().isEmail();
        req.assert('career', 'Career must either be student, teacher, or professor.').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {
            helper.failure(res, next, errors, 400);
        }

        var user = req.params;
        max_user_id++;
        user.id = max_user_id;
        user.fname = req.params.firstname;
        user.lname = req.params.lastname;
        user.email = req.params.email;
        user.career = req.params.career;
        users[user.id] = user;
        users[user.fname] = user;
        users[user.lname] = user;
        users[user.email] = user;
        users[user.career] = user;
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