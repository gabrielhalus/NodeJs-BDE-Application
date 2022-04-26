const User = require('../models/User')
const bcrypt = require('bcryptjs')

const signup = (req,res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(user) {
            // TODO: Retour page signup avec une alerte danger
            res.render('login', { alreatyTaken: 'This email address is already taken!'})
        } else {
            bcrypt.hash(req.body.password, 10, function(err, hashedPassword) {
                if(err) {
                    error: err
                } else {
                    const user = new User({
                        'firstName': req.body.firstName,
                        'lastName': req.body.lastName,
                        'email': req.body.email,
                        'password': hashedPassword
                    })
                    user.save().then(() => {
                        // TODO: Aller page login avec une alerte succes
                        res.render('login')
                    }).catch(error => {
                        res.json({
                            message: 'An error occured!'
                        })
                    })
                }
            })
        }
    })
}

const login = (req,res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if(err) {
                    error: err
                }
                if(result) {
                    req.session.user = req.body.email
                    // TODO: Aller home avec une alerte succes
                    res.render('index', {isLogged: true})
                }
            })
        } else {
            // TODO: Retour page login avec une alert danger
            res.render('login')
        }
    })
}

module.exports = {
    signup, login
}