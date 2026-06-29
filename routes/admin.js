var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');
var {LocalStorage} =require('node-localstorage');
var localStorage = new LocalStorage('./scratch');
const {check_user} = require('./checkuser');

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
 var user = check_user(req);
 if(user){
  res.render('dashboard',{data:user});
 }
 else{
  res.render('login_page');
 }
});


router.get('/login_page', function(req,res,next){
 var user = check_user(req);
 if(user){
  res.render('dashboard',{data:user});
 }
 else{
  res.render('login_page');
 }
});

router.post("/chk_login", function(req, res) {

    pool.query(
        "select * from admin where (emailid=? or mobileno=?) and password=?",
        [req.body.emailid, req.body.emailid, req.body.password],
        function(err, result) {

            if (err) {
                return res.render("login_page", {
                    message: "Server Error"
                });
            }

            if (result.length == 1) {

                req.session.user = JSON.stringify(result[0]);

                req.session.save(function(err) {

                    if (err) {
                        return res.render("login_page", {
                            message: "Session Error"
                        });
                    }

                    // Redirect to dashboard after successful login
                    return res.redirect("/admin/dashboard");
                });

            } else {

                return res.render("login_page", {
                    message: "Invalid EmailID / Mobile No / Password"
                });

            }
        }
    );

});
            
    router.get("/logout",function(req,res){
    req.session.destroy();
     res.redirect('/admin/login_page')
})


module.exports = router;
