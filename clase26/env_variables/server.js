const express = require('express')
const config = require('./config.js')

const app = express()

app.get('/', (req, res) => {
   return res.send('Bienvenido!')
})

app.listen(config.PORT, config.HOST, () => {
   console.log(`Aplicación corriendo en http://${config.HOST}:${config.PORT}`)
})

app.on('error', (error) => {
   console.log({error})
})