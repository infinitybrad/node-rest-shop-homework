const express =  require('express');
const router = express.Router();
const mongoose = require("mongoose");

const productModel = require("../models/product");


//data get
router.get('/',(req,res) => {
    // res.status(200).json({
    //     msg : 'sucesss get  product '
    // });
    productModel
        .find()
        .exec()
        .then(docs =>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                err:err
            });
        });


});

//detail data get
router.get('/:pID',(req,res) => {
    const id = req.params.pID;
    productModel
        .findById(id)
        .exec()
        .then(doc => {
            console.log("from database",doc);
            if(doc)
            {
                res.status(200).json(doc);

            }else{
                res.status(400).json({
                    msg:"no id"
                });

            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err:err
            });
        });

});

//data create
router.post ('/',(req,res) => {


    // const product = {
    //     na:req.body.n,
    //     pr:req.body.p
    // };

    const product = new productModel({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });

    // res.status(201).json({
    //     msg : 'creat product',
    //     productInfo:product
    // });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg:'sucess post',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//data patch
router.patch('/',(req,res) =>{
    res.status(200).json({
        msg:'modify product'
    });
});
//data delete
router.delete('/',(req,res) => {
    res.status(200).json({
        msg:'delete product'
    });
});


module.exports = router;