var express = require('express');
var pool=require('./pool');
var router = express.Router();
var upload=require('./multer');

router.get('/product_interface', function(req,res,next){
    res.render('product_interface', {message:''});
})
router.get('/Display_all_products', function(req,res,next){
    res.render('DisplayALLProducts');
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
    })
        
   
    router.get('/fetch_all_subcategory_by_categoryid', function(req,res){

    pool.query("select * from subcategory where categoryid=?", [req.query.categoryid], function(err,result){
        if(err)
        {
            res.json({status:false, message:err});
        }
        else
        {
            res.json({status:true, data:result});
        }
    })
    })

     router.post('/submit_product' ,upload.single('picture'), function(req,res){

    pool.query("insert into products (categoryid, subcategoryid, productname, productrate, productoffer, stock, weight, productpicture) values( ?, ?, ?, ?, ?, ?, ?, ?)", [ req.body.categoryid, req.body.subcategoryid, req.body.productname, req.body.productrate, req.body.productoffer, req.body.productstock, req.body.productweight, req.file.filename], function(err,result){
        if(err)
        {
            console.log(req.body);
            console.log(req.file);
            res.render('product_interface', { message:"sql Error"});
        }
        else
        {
            res.render('product_interface', { message:"Record Submitted Successfully"});
        }
    })
    })
    router.get('/fetch_all_products', function(req,res){

    pool.query("select * from products", function(err,result){
        if(err)
        {
            res.json({status:false, message:err});
        }
        else
        {
            res.json({status:true, data:result});
        }
        })
    })
 

 



module.exports = router;
