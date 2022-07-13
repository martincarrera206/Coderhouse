const { json } = require('express')
const express = require('express')
const session = require('express-session')
const redis = require('redis')

const username = 'default'
const password = 'cxUlQ72lVVFAi9YdVui2d4n9JXwUJqDo'
const host = 'redis-19394.c273.us-east-1-2.ec2.cloud.redislabs.com'
const port = '19394'
// Para conectar desde el cli
// Para usar el redis remoto con RedisLabs
const client = redis.createClient({
    url: `redis://${username}:${password}@${host}:${port}`,
    legacyMode: true
})
client.connect()

// Para traer valores del servidor reddis
/*
client.set('producto1', (error, value) => {
    if(error) throw new Error(error.message)
    const valueObj = JSON.parse(value)

    console.log({ valueObj })
})
*/

// Para traer valores del servidor reddis
client.get('producto1', (error, value) => {
    if(error) throw new Error(error.message)
    const valueObj = JSON.parse(value)

    console.log({ valueObj })
})

const RedisStore = require('connect-redis')(session)

const app = express()

app.use(session({
 store: new RedisStore({
   client,
   ttl: 300
 }),
 secret: 'qwerty',
 resave: true,
 saveUninitialized: true
}))

app.get('/root', (req, res) => {
    if (req.session.contador) {
      req.session.contador++
  
      return res.send(`${req.session.name} has visitado ${req.session.contador} veces el sitio`)
    }
  
    req.session.name = ''
  
    const { name } = req.query
  
    if (name) {
      req.session.name = name
    }
  
    req.session.contador = 1
  
    return res.send(`Te damos la bienvenida ${req.session.name}`)
})

app.get('/olvidar', (req, res) => {
    const name = req.session.name || ''

    return req.session.destroy(err => {
        if (!err) {
        return res.send(`Hasta luego ${name}`)
        }

        return res.json({ error: err })
    })
})
  
const SRVPORT = 8080
  
app.listen(SRVPORT, () => console.log(`Servidor escuchando en el puerto ${SRVPORT}`))

app.on('error', (error) => {
    console.log({error})
})
