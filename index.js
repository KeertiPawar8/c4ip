require("dotenv").config()
const express = require("express");
const app = express();
app.use(express.json())
const {connection} = require("./db")
const {logger} = require("./middlewares/logger")
const {userRouter} = require("./routes/user.routes")
const  {ipRouter} = require("./routes/ip.routes")

app.use(logger)
app.use("/",userRouter)

app.use("/",ipRouter)

app.listen(process.env.port,async()=>{
    await connection
    console.log( `server is running at port ${process.env.port}`)
})