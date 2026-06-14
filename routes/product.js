var express = require('express');
var pool=require('./pool');
var router = express.Router();
var upload=require('./multer');

router.get('/product_interface', function(req,res,next){
    res.render('product_interface', {message:''});
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

    pool.query("select p.*,c.*,s.*  from products p,category c, subcategory s where p.subcategoryid=s.subcategoryid and p.categoryid=c.categoryid", function(err,result){
        if(err)
        {
            res.render('DisplayAllProducts', {status:false,data:[]});
        }
        else
        {
            res.render('DisplayAllProducts', {status:true,data:result});
        }
        })
    })
    
     router.get('/edit_delete_view/:productid', function(req,res){

    pool.query("select p.*,c.*,s.*  from products p,category c, subcategory s where p.subcategoryid=s.subcategoryid and p.categoryid=c.categoryid and p.productid =?",[req.params.productid], function(err,result){
        if(err)
        {
            res.render('edit_delete', {status:false,data:[]});
        }
        else
        {
            res.render('edit_delete', {status:true,data:result[0]});
        }
        })
    })
    
    
router.get('/login_page', function(req,res,next){
    res.render('login_page');
})

router.post("/chk_login",function(req,res)
    {
        var {emailid,pwd}=req.body
        if (emailid=="bhumikagautam751@gmail.com" && pwd=="12345") 
            { res.render('product_interface', {message:''}); 
    }
            
   
    });

    router.post('/product_edit_delete' , function(req,res){
        var btn_value=req.body.btn
        if(btn_value=="Edit")
        {
            pool.query("update products set categoryid=?, subcategoryid=?, productname=?, productrate=?, productoffer=?, stock=?, weight=? where productid=?", [req.body.categoryid, req.body.subcategoryid, req.body.productname, req.body.productrate, req.body.productoffer, req.body.productstock, req.body.productweight,  req.body.productid], function(err,result){ 
                if(err)
                {
                    console.log(req.body);
                    res.redirect('/product/fetch_all_products');
                }
                else
                {
                    res.redirect('/product/fetch_all_products');
                }
            })
        }
        else{
            pool.query("delete from products where productid=?",[req.body.productid],function(err,result){
                if(err)
                {
                    console.log(req.body);
                    res.redirect('/product/fetch_all_products');
                }
                else
                {
                    res.redirect('/product/fetch_all_products');
                }
            })
        }
    })
    router.get("/show_picture/:id/:name/:picture", function(req,res){
        res.render("show_picture_for_edit", { data: req.params })
    })

    router.post("/final_picture_edit",upload.single('picture'),function(req,res){
        pool.query("update products set productpicture=? where productid=?",[req.file.filename,req.body.productid],function(err,result){
        
            if(err)
            {
                res.redirect('/product/fetch_all_products')
            }
       else{
                res.redirect('/product/fetch_all_products')
   }
        })
    })
 

 



module.exports = router;
