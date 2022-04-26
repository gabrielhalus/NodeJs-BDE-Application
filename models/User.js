const mongoose = require('mongoose')
const Shema = mongoose.Schema

const userSchema = new Shema({
    'firstName': String,
    'lastName': String,
    'email': String,
    'password': String
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User