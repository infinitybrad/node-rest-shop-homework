const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt =  require("jsonwebtoken");


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

// user login
router.post('/login',(req,res) => {

    userModel
        .find({email:req.body.email})
        .then(user =>{

            if(user.length <1)
            {
                return res.status(401).json({
                    msg: "Can't Find user"
                });
            }

            bcrypt.compare(req.body.password , user[0].password, (err,result) => {

                if(err)
                {
                    return res.status(401).json({

                        msg: "incorrect password"

                    });
                }

                const token  = jwt.sign({

                    email:user[0].email,
                    userId : user[0]._id
                },
                "secret",{expiresIn: "1h"}
                );
                return res.status(200).json({
                    msg:"Auth Successful",
                    tokenInfo :token
                });

            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});






module.exports =router;
