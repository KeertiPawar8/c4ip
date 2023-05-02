const mongoose = require("mongoose")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { RedisFlushModes } = require("redis");
const authenticate = async(req,res,next)=>{
const {redisClient} = require("../redis")
let token = req.headers.authorization.split(" ")[1]

if(token){


    const blacktoken = await redisClient.get(token)

    if(blacktoken){
        res.send({msg:"token blacklisted ,please login again"})
    }

else{
try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
          req.body.userID = decoded.userID
       
next()

}
catch(err){
        res.send(err.message)
}




}


}
else{
    res.send({msg:"login again"})
}


}

module.exports = {
    authenticate
};
