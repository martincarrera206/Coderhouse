const express = require('express')
const session = require('express-session')
// Al file store se le pasa el modulo de session que utilizamos
// Nos devuelve una clase por eso lo ponemos en mayuscula
const MongoStore = require('connect-mongo')

const app = express()

const username = encodeURIComponent("mcarrera");
const password = process.env.MONGODB_PASSWORD || encodeURIComponent("5rMvafY7sRXpxt");
const dataBase = encodeURIComponent("clase20");
const URL = `mongodb+srv://${username}:${password}@cluster0.mkluq1v.mongodb.net/${dataBase}?retryWrites=true&w=majority`

app.use(session({
 store: MongoStore.create({
    mongoUrl:URL,
    ttl: 300
 }),
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