const mongoose  =  require("mongoose");

const schemaquestion =  new mongoose.Schema({
    desc:{
        type:String,
        required:true,
        trim:true,
    },
    upvote:{
        type:Number,
        default:0,
    },
    downvote:{
        type:Number,
        default:0,
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    comments:[
        {   
            by:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
           },
            name:{
                type: String,
                required: true,
                trim: true
            },
            desc:{
                type: String,
                required: true
            },
            
        }
    ],
    
})

module.exports  =  mongoose.model("schemaquestion",schemaquestion)