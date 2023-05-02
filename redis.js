const redis = require("redis")

const redisClient = redis.createClient();

redisClient.on("connect",async()=>{
    console.log("connected to redis")
    })


    redisClient.on("error",async(err)=>{
        console.log(err.message)
        })


        redisClient.connect();


        module.exports = {
            redisClient
        };
        
