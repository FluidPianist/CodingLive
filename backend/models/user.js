var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    facebookId: String,
    googleId:String,
    usertype:{
        type:String,
        default: '',
    },
    active: {
        type: Boolean,
        default: true,
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);