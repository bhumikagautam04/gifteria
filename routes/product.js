var express = require('express');
var pool=require('./pool');
var router = express.Router();

router.get('/product_interface', function(req,res,next){
    res.render('product_interface');
})

router.get('/fetch_all_category', function(req,res){

    pool.query("select* from category", function(err,result){
        if(err)
        {
            res.json({status:false, message:err});
        }
        else
        {
            res.json({status:true, data:result});
        }
    })

}
)

module.exports = router;
