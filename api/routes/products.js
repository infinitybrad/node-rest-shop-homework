const express =  require('express');
const router = express.Router();


//data get
router.get('/',(req,res) => {
    res.status(200).json({
        msg : 'sucesss get  product '
    });
});
//data create
router.post ('/',(req,res) => {
    res.status(200).json({
        msg : 'creat product'
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