const jwt =require('jsonwebtoken');
require('dotenv').config();

exports.requireSignin=function(req,res,next){
    // get token
    const token=req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:"no token found...."});
    }
    try{
       const decodetoken=jwt.verify(token,process.env.SecretKey);
       console.log(decodetoken);
       req.user=decodetoken;
       next();
    }catch{
      res.status(401).json({msg:"Token is invalid"});
    }
}
exports.userMiddleware = (req, res, next) => {
   
     if(req.user.Role !== 'user'){
         return res.status(400).json({ message: 'User access denied' })
     }
     next();
 }
 
 exports.sellerMiddleware = (req, res, next) => {
  
    if(req.user.Role !== 'seller'){
        return res.status(400).json({ message: 'Admin access denied' })
    }
    next();
}
 
 exports.adminMiddleware = (req, res, next) => {
  
     if(req.user.Role !== 'admin'){
         return res.status(400).json({ message: 'Admin access denied' })
     }
     next();
 }
 