import express from 'express'
let app = express()
const PORT = 8080

import getRandomNombre from './getRandomNombre.js'
import getRandomApellido from './getRandomApellido.js'
import getRandomColor from './getRandomColor.js'

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

app.get('/', (request, response, next) => {
    response.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>')
})

app.get('/test', (request, response, next) => {
    let personas = []
    for (let index = 0; index < 10; index++) {
        const randNombre = getRandomNombre()
        const randApellido = getRandomApellido()
        const randColor = getRandomColor()

        const persona = {
            nombre: randNombre,
            apellido: randApellido,
            color: randColor
        }

        personas.push(persona)
    }
    console.log({personas})

    return response.json(personas)
})

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

app.on('error', (error) => {
    console.log({error})
})