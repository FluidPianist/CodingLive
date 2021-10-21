var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Candidate = new Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        default: null
    },
    about:{
        type: String, 
        default: ''
    },
    skills:{
        type: [String],
        default: ['']
    },
    projects:{
        type: [String],
        default: ['']
    },
    experience:{
        type: [String],
        default: ['']
    }    
});
module.exports = mongoose.model('Candidate',Candidate);