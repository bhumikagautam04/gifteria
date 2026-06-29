 
 function check_user(req){
 try {
    var user= req && req.session ? req.session.user : undefined;
    console.log('userrrrr:',user);
    if (user == undefined){
      return false;
    }
    var data =JSON.parse(user);
    if(data==null){
      return false
    }
    else{
    return data
    }
  }catch (e){

  return false
  }
}
module.exports={check_user};