const express = require('express');
const router =express.Router();
const mongoose = require("mongoose");

const orderModel= require("../models/order");
const productModel = require("../models/product");


// data get 
router.get('/',(req,res) => {
    // res.status(200).json({
    //     msg:'sucess get orders'
    // });

    orderModel
        .find()
        .exec()
        .then(docs => {
            res.status(200).json({
                count:docs.length,
                orderList:docs
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });

});

//get detail data
router.get('/:orderID',(req,res) => { // 장바구니 한개의 데이터 불러오기

    const id =  req.params.orderID;

    orderModel
        .findById(id)
        .exec()
        .then(result => {

            if(!result)
            {
                return res.status(404).json({
                    msg:"no id"
                });
            }
            res.status(200).json({
                msg:"successful order detail info ",
                orderInfo:result
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });



});
// data create
router.post('/',(req,res) => { // 장바구니에 제품 담기.
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
router.patch('/:orderID',(req,res) => {


    const id =  req.params.orderID;

    const updateOps={};

    //updateOps[_id] = req.params.orderID;
    //updateOps[product] = orderModel.findById(req.params.orderID).product;
    orderModel
        .findById(id)
        .exec()
        .then(result => {
            if(!result)
            {
                return res.status(404).json({
                    msg:"find not id"
                });
            }
            else{

                res.status(200).json({
                    msg:"find order id ",
                    info :result

                });
                 updateOps["_id"] = result._id;
                 updateOps["product"] = result.product;
                 updateOps["quantity"] = req.body.value;
                 console.log(updateOps);

                 orderModel
                    .update({_id:id},{$set:updateOps})
                    .exec()
                    .then(result =>{
                        console.log(result);
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            err:err
                        });
                    });
                
            }

        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });

        });
    

    

});


//detail data delete
router.delete('/:orderID',(req,res) => {
    // res.status(200).json({
    //     msg:'sucess delete orders'
    // });
    const id  = req.params.orderID;

    orderModel
        .remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json({
                msg:"deleted order"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });



});


module.exports = router;