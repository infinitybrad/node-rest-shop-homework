const mongoose = require("mongoose");

const orderScheme = mongoose.Schema({

    _id:mongoose.Schema.ObjectId,
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        require:true

    },
    quantity:{
        type:Number,
        default:1
    }

});

module.exports = mongoose.model("order",orderScheme);
