const express = require('express')

let app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

const mascotaRouter = require('./mascotas')
const personaRouter = require('./personas')

app.get('/', (request, response, next) => {
    response.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>')
})

//Indico que todas las rutas que de de alta en el Router van a estar con ese prefijo
app.use('/api/mascotas', mascotaRouter)
app.use('/api/personas', personaRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

app.on('error', (error) => {
    console.log({error})
})