const express = require('express')
const session = require('express-session')
const PORT = 8080

const app = express()

app.use(session({
    secret: 'qwerty',
    resave: true,
    saveUninitialized: true
}))

const users = [
    {username: 'admin', password: 'admin', admin: true},
    {username: 'pepe', password: 'asdasd', admin: false}
]

// Middleware auth
const auth = (req, res, next) => {
    if (req.session.user) {
      return next()
    }
   
    return  res.status(401).json({
      error: 'Necesitas iniciar sesión'
    })
}
   
const isAdmin = (req, res, next) => {
    if (req.session.admin) {
      return next()
    }
   
    return  res.status(401).json({
      error: 'Necesitas ser usuario administrador'
    })
}
   
// ROUTES

app.get('/session', (req, res) => {
    if (req.session.contador) {
      req.session.contador++
      return res.send(`Has visitado ${req.session.contador} veces el sitio.`)
    }
   
    req.session.contador = 1
    return res.send('Bienvenido.')
})

app.get('/login', (req, res) => {
    const { username, password } = req.query
   
    const user = users.find(u => {
      return u.username === username && u.password === password
    })
   
    if (!user) {
      return res.json({ error: 'Login failed'})
    }
   
    req.session.user = username
    req.session.admin = user.admin
   
    return res.json({
      user: req.session.user,
      admin: req.session.admin
    })
})

app.get('/logout', (req, res) => {
    return req.session.destroy(err => {
      if (!err) {
        return res.send({ logout: true })
      }
      return res.send({ error: err })
    })
})

// AUTH ROUTES
app.get('/profile', auth, (req, res) => {
    return res.send('si estás viendo esto es porque ya te logueaste!')
})

app.get('/admin', auth, isAdmin, (req, res) => {
    return res.send('si estás viendo esto es porque eres usuario administrador!')
})
   
// SERVER UP
app.listen(PORT, () => console.log(`Servidor Http escuchando en el puerto ${PORT}`))

app.on('error', (error) => {
    console.log({error})
})
