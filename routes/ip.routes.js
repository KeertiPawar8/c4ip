const {authenticate} = require("../middlewares/auth.middleware")
const axios = require("axios")
const express = require("express")
const ipRouter = express.Router();
const {redisClient} = require("../redis")
const {SearchModel} = require("../models/userSearches.model")
ipRouter.get("/currentcity/:id",authenticate,async(req,res)=>{
    console.log(req.body)

const check = await SearchModel.find({userID:req.body.userID})
if(check.length==0){

    const Search = new SearchModel({userID :req.body.userID})
    await Search.save();

}



    const ip = req.params.id

const cityfromredis = await redisClient.get(ip)
if(cityfromredis){
    res.send({city:cityfromredis,msg:"data is coming from redis"
    })

}

else{

    const data = await axios.get(`https://ipapi.co/${ip}/city/`)

    let city = data.data;
    
    redisClient.set(ip,city,{EX:21600})





    
    res.send({city})
}


})




module.exports = {
    ipRouter
};
