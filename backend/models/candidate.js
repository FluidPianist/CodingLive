var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const apppliedSchema = new Schema({
   vacancy:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Vacancy'
   },
   status:{
       type: String,
       default: "pending"
   }
 },{
     timestamps: true
 }
)

const projectSchema = new Schema({
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    link:{
        type: String,
    }
  }
 )

 const experienceSchema = new Schema({
    position:{
        type: String,
    },
    company:{
        type: String,
    },
    description:{
        type: String,
    },
    type:{
        type: String,
    }
  }
 )

 const educationSchema = new Schema({
    degree:{
        type: String,
    },
    institution:{
        type: String,
    },
    result:{
        type: String,
    },
 })

 const achievementSchema = new Schema({
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    links:{
        type: String
    }
 })

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
    },
    projects:{
        type: [projectSchema],
    },
    experience:{
        type: [experienceSchema],
    },
    education:{
        type: [educationSchema],
    },
    achievements:{
        type: [achievementSchema],
    },
    applied:{
        type: [apppliedSchema],
    },
    appointments:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Appointment'
    }
});

module.exports = mongoose.model('Candidate',Candidate);