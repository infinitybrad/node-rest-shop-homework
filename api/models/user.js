const mongoose =require("mongoose");

const userSchma = mongoose.Schema({

    _id:mongoose.Schema.Types.ObjectId,
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('user', userSchma);
