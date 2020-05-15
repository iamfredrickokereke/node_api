var helper = require('../config/helperFunction');
var UserModel = require('../models/userModel');
   

module.exports = (server) => {
    
    // retrieve default route path

    server.get('/', (req, res, next) =>{
        UserModel.find({}, (err, docs) => {
            // docs is an array
            if (err) {
                helper.failure(res, next, errors, 400);
            } else {
                helper.success(res, next, docs);
            }
        });
    })

    server.get('/user/:id', (req, res, next) =>{

        req.assert('id', 'id is required and must be numeric').notEmpty();

        var errors = req.validationErrors();
         
        if (errors) {
                helper.failure(res, next, errors[0], 400);
            }
        UserModel.findOne({_id : req.params.id}, (err, user) => {
            if (err) {
                helper.failure(res, next, 'Oops, Something went wrong while fetching user data', 500);
            }
            if (user === null) {
                helper.failure(res, next, 'The specified user could not be found', 400);
            }              
            helper.success(res, next, user);
        })
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

        var user = UserModel();

        user.firstname = req.params.firstname;
        user.lastname = req.params.lastname;
        user.email = req.params.email;
        user.career = req.params.career;

        user.save(function (error) {
            if (error) {
                helper.failure(res, next, errors, 500);
            } else {
                helper.success(res, next, user);
            }
        })
        helper.success(res, next, user)
    })


    server.put('/user/:id', (req, res, next) =>{

        req.assert('id', 'id is required and must be numeric').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {
            helper.failure(res, next, errors, 400);
        }
        UserModel.findOne({_id : req.params.id}, (err, user) => {
            if (err) {
                helper.failure(res, next, 'Oops, Something went wrong while fetching user data', 500);
            }
            if (user === null) {
                helper.failure(res, next, 'The specified user could not be found', 400);
            } 
            var updates = req.params;
            delete updates.id;
            for (const field in updates) {
                
                user[field] = updates[field];
            } 
            user.save(function (error) {
                if (error) {
                    helper.failure(res, next, errors, 500);
                } else {
                    helper.success(res, next, user);
                }
            })            
            helper.success(res, next, user)
        })
        
    })

    server.del('/user/:id', (req, res, next) =>{

        req.assert('id', 'id is required and must be numeric').notEmpty().isInt();
        
        var errors = req.validationErrors();
        if (errors) {
            helper.failure(res, next, errors, 400);
        }
        
        UserModel.findOne({_id : req.params.id}, (err, user) => {
            if (err) {
                helper.failure(res, next, 'Oops, Something went wrong while fetching user data', 500);
            }
            if (user === null) {
                helper.failure(res, next, 'The specified user could not be found', 400);
            } 
            
            user.remove(function (error) {
                if (error) {
                    helper.failure(res, next, errors, 500);
                } else {
                    helper.success(res, next, user);
                }
            })            
            helper.success(res, next, user)
        })
        
        helper.success(res, next, { status: 'user deleted successfully', 'content' : []});
    })
    }    


