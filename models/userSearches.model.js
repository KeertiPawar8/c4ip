const mongoose = require("mongoose");

const searchSchema = mongoose.Schema({
    userID: String,
    userSearches:[{type:String}]
   
})

const SearchModel = mongoose.model("userSearches",searchSchema)

module.exports = {
    SearchModel
};
