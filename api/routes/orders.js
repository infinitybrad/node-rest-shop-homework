const express = require('express');
const router =express.Router();
const mongoose = require("mongoose");

const orderModel= require("../models/order");
const productModel = require("../models/product");


// data get 
router.get('/',(req,res) => {
    res.status(200).json({
        msg:'sucess get orders'
    });
});

// data create
router.post('/',(req,res) => {
    // res.status(200).json({
    //     msg:'sucess post orders'
    // });

    productModel
        .findById(req.body.productId)
        .then(product => {
            if(!product)
            {
                return res.status(404).json({
                    msg:"product not found"
                });
            }
            const order = new orderModel({
                _id:mongoose.Types.ObjectId(),
                product:req.body.productId,
                quantity:req.body.quantity
            });
            return order.save();

        })
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg:"order stored",
                createOrder:{
                    _id:result.id,
                    product:result.product,
                    quantity:result.quantity
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });



});


// data patch
router.patch('/',(req,res) => {
    res.status(200).json({
        msg:'patch orders'
    });
});


// data delete
router.delete('/',(req,res) => {
    res.status(200).json({
        msg:'sucess delete orders'
    });
});


module.exports = router;