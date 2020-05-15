var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserShema = new Schema({
    id : ObjectId,
    firstname : String,
    lastname : String,
    email : String,
    career : String
})


var UserModel = mongoose.model('users', UserShema)

module.exports = use
