const mongoose = require('mongoose')
const Shema = mongoose.Schema

const userSchema = new Shema({
    'email': String,
    'password': String
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User