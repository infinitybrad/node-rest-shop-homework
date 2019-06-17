const express = require('express');
const router =express.Router();

// data get 
router.get('/',(req,res) => {
    res.status(200).json({
        msg:'sucess get orders'
    });
});

// data create
router.post('/',(req,res) => {
    res.status(200).json({
        msg:'sucess post orders'
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