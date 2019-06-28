const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userModel = require("../models/user");

router.post('/signup',(req,res) => {

    // const user = new userModel({
    //     _id:new mongoose.Types.ObjectId(),
    //     username:req.body.username,
    //     email:req.body.email,
    //     password:req.body.password
    // });

    // user
    //     .save()
    //     .then(result => {
    //         res.status(200).json({
    //             msg:"user created",
    //             userinfo:result

    //         });
    //     })
    //     .catch(err =>  {
    //         console.log(err);
    //         res.status(500).json({
    //             error:err

    //         });
    //     });

    bcrypt.hash(req.body.password,10,(err,hash) => {

        if(err)
        {
            return res.status(500).json({
                error:err
            });
        }
        const user = new userModel({
            _id: new mongoose.Types.ObjectId(),
            username:req.body.username,
            email:req.body.email,
            password:hash
        });

        user    
            .save()
            .then(result => {
                res.status(200).json({
                    msg:"user created",
                    userinfo:result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
    })

});


router.post('/login',(req,res) => {

});






module.exports =router;
