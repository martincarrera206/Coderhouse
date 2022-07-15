const express = require('express')
const session = require('express-session')
// Al file store se le pasa el modulo de session que utilizamos
// Nos devuelve una clase por eso lo ponemos en mayuscula
const FileStore = require('session-file-store')(session)

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
 store: new FileStore({ path: './sessiones', ttl: 120 }),
 secret: 'qwerty',
 resave: true,
 saveUninitialized: true
}))

let users = []

function isLoggedIn(req, res, next) { 
    if (req.session && req.session.user) 
        return next()
    res.redirect('/login'); 
} 

app.get('/login', function(req, res, next) { 
    return res.render('login', { title: 'Login Page' })
})

app.post('/login', function(req, res, next) { 
    const { username, password } = req.body
    console.log({query: req.body.username})

    if(!username) return res.json({error: true, message: "Se requiere completar el nombre de usuario"})
    if(!password) return res.json({error: true, message: "Se requiere completar la contraseña"})

    const selected_user = users.find(user => { user.username == username })

    if(!selected_user) return res.json({error: true, message: "No existe este usuario"})
    if(selected_user.password !== password) return res.json({error: true, message: "Contraseña incorrecta"})
    
    req.session.user = selected_user

    return res.render('profile', { title: 'Profile Page', user : selected_user })
}) 

app.get('/signup', function(req, res) { 
    res.render('signup', { title: 'Signup Page' }) 
})

app.post('/signup', function(req, res, next) { 
    const { username, password } = req.body
    console.log({query: req.body})

    if(!username) return res.json({error: true, message: "Se requiere completar el nombre de usuario"})
    if(!password) return res.json({error: true, message: "Se requiere completar la contraseña"})
    
    const new_user = {username: username, password: password}
    users.push(new_user)

    req.session.user = new_user

    return res.render('profile', { title: 'Profile Page', user : new_user })
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