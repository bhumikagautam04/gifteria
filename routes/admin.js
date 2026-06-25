var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get('/login_page', function(req,res,next){
    res.render('login_page',{message:" "});
})


router.post("/chk_login",function(req,res)
    {
   pool.query("select * from admin where (emailid=? or mobileno=? )and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(err,result){
if(err)
{
  res.render('login_page',{message:'Server Error'})
}
else{
  if(result.length==1)
  {
    res.render("dashboard")
  }
  else{
    res.render('login_page',{message:"Invalid EmailID/Mobileno/Password"})
  }
}
   })
            
   
    });

module.exports = router;
