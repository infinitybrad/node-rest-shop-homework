const mongoose  =  require("mongoose");

const productScheme = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    price:String
});

module.exports = mongoose.model("product",productScheme);