const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/clase25')
const flash = require('connect-flash')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const User = require('./models/user')
const { createHash, isValidPassword } = require('./utils')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
 secret: 'qwerty',
 resave: true,
 saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.set('view engine', 'ejs')
app.set('views', './views')
   
function isLoggedIn(req, res, next) { 
    if (req.session && req.session.user) 
        return next()
    res.redirect('/login'); 
} 

let users = []

passport.use('login', new LocalStrategy( (username, password, done) => {
      return User.findOne({ username })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Nombre de usuario incorrecto' })
          }
          if (!isValidPassword(user.password, password)) {
            return done(null, false, { message: 'Contraseña incorrecta' })
          }
          return done(null, user)
        })
        .catch(err => done(err))
    }
))

passport.use('signup', new LocalStrategy( {
    passReqToCallback: true
}, (req, username, password, done) => {
      return User.findOne({ username })
        .then(user => {
          if (user) {
            return done(null, false, { message: 'El nombre de usuario ya esta en uso' })
          }
          const newUser = new User()
          newUser.username = username
          newUser.password = createHash(password)
          newUser.email = req.body.email

          return newUser.save()
        })
        .then(user => {
            return done(null, user)
        })
        .catch(err => done(err))
    }
))

passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    console.log('serializeUser')
    User.findById(id)
    .then(user => {
        done(null, user)
    })
})

app.get('/login', function(req, res, next) { 
    return res.render('login', { message: req.flash('error') })
})

app.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/signup', function(req, res) { 
    res.render('signup', { message: req.flash('error') }) 
})

app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}))

app.get('',(req, res, next) => {
    if(req.isAuthenticated())
        return next()
    return res.redirect('/login')
}, (req, res) => {
    return res.json({user: req.user})
})

app.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile', { title: 'Profile Page', user : req.user });
});

app.get('/logout', function(req, res) { 
    return req.session.destroy(err => {
        if (!err) return res.render('login')

        return res.json({ error: err })
    })
});

// SERVER UP
const PORT = 8080
app.listen(PORT, () => console.log(`Servidor Http escuchando en el puerto ${PORT}`))

app.on('error', (error) => {
    console.log({error})
})