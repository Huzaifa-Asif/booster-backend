const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
var ContentCreatorSchema = Schema({
    name: String,
    email: String,
    password: String,
    igShoutoutPrice: Number,
    igLink:String,
    igCategory:String,
    fbShoutoutPrice: Number,
    fbLink:String,
    fbCategory:String,
    paypalId:String,
    profilePic:String
});

module.exports = ContentCreator = mongoose.model('contentcreators', ContentCreatorSchema)
