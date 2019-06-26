const mongoose = require("mongoose");

const orderScheme = mongoose.Schema({

    _id:mongoose.Schema.ObjectId,
    product:{
        type:mongoose.Schema.Types.ObjectId, //'product'의 데이터 타입은 몽고디비의 아이디 형식이다.
        ref:'product', //아이디 참조는 내가 만든 몽고디비의 'product' 컬렉션에서 한다.
        require:true   //유저가 서버에 요청시 'product' 항목은 반드시 기입해야 한다.
    },
    quantity:{
        type:Number,
        default:1
    }

});

module.exports = mongoose.model("order",orderScheme);
