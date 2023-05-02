const express = require("express");
const {UserModel} = require("../models/user.model")
const {authenticate} = require("../middlewares/auth.middleware")
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {redisClient} = require("../redis")
require("dotenv").config()
const {SearchModel} = require("../models/userSearches.model")


userRouter.post("/signup",async(req,res)=>{
const {name,email,pass} = req.body;

const checkuser = await UserModel.find({email});
if(checkuser.length>0){
    res.send({msg:"user already exist ,please login"})

}
else{

try{

bcrypt.hash(pass,5,async(err,hash)=>{

    const user = new UserModel({name,email,pass:hash})
         await user.save();
         res.send("new user has been registered")

      

})



}catch(err){
    res.send(err.message)
}



}



})


userRouter.post("/login",async(req,res)=>{

const {email,pass} = req.body;
const checkuser = await UserModel.find({email});

if(checkuser.length==0){
    res.send({msg:"user does not exist please login"})
}
else{

bcrypt.compare(pass,checkuser[0].pass,(err,result)=>{

if(result){

const token =jwt.sign({userID:checkuser[0]._id},process.env.JWT_SECRET)

res.send({msg:token})

}

})


}

})



userRouter.get("/logout",authenticate,async(req,res)=>{

const token = req.headers.authorization.split(" ")[1]

if(token){

     await redisClient.set(token,token)
      res.send("logout successful")
}
else{
    res.send({msg:"something went wrong ,login again"})
}


})




module.exports = {
    userRouter
};
