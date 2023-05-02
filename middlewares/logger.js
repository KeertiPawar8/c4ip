const express = require("express")
const expressWinston = require("express-winston")
const winston = require("winston")
require("dotenv").config()
require("winston-mongodb")

const logger = expressWinston.logger({

statusLevels:true,

transports:[

    new winston.transports.Console({
        json:true,
        colorize:true,
        level:"error"
    }),
    new winston.transports.MongoDB({
        db:process.env.mongoURL,
        level:"info"
    })
],


})


module.exports = {
    logger
};
