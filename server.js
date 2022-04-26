const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const {v4: uuidv4} = require('uuid')

const router = require('./router')

mongoose.connect('mongodb://127.0.0.1:27017/bde-users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Connection with database established…!')
})

const app = express()

const PORT = process.env.PORT || 3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

// loat static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret: uuidv4(), // 57nhqhgy-aoor-mp0q-85zy-njnokzd1
    resave: false,
    saveUninitialized: true
}))

// home route
app.get('/', (req,res) => {
    res.render('index', {title: "0x0BDE - Home"})
})

app.get('/signup', (req,res) => {
    res.render('signup', {title: "0x0BDE - Sign Up"})
})

app.get('/login', (req,res) => {
    res.render('login', {title: "0x0BDE - Log In"})
})

app.listen(PORT, () => {
    console.log("Listening to server on http://localhost:3000")
})

app.use('/route', router)