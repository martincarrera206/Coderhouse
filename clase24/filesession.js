const express = require('express')
const session = require('express-session')
// Al file store se le pasa el modulo de session que utilizamos
// Nos devuelve una clase por eso lo ponemos en mayuscula
const FileStore = require('session-file-store')(session)

const app = express()

app.use(session({
 store: new FileStore({ path: './sessiones', ttl: 60 }),
 secret: 'qwerty',
 resave: true,
 saveUninitialized: true
}))



app.get('/session', (req, res) => {
    if (req.session.contador) {
      req.session.contador++
      return res.send(`Has visitado ${req.session.contador} veces el sitio.`)
    }
   
    req.session.contador = 1
    return res.send('Bienvenido.')
})
/*
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
*/
app.get('/logout', (req, res) => {
    return req.session.destroy(err => {
      if (!err) {
        return res.send({ logout: true })
      }
      return res.send({ error: err })
    })
})

// SERVER UP
const PORT = 8080
app.listen(PORT, () => console.log(`Servidor Http escuchando en el puerto ${PORT}`))

app.on('error', (error) => {
    console.log({error})
})