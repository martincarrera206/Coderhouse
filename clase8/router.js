const express = require('express')
const { Router } = express //Esto es igual a const Router = express.Router

let app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

let messages = [
    {
        id: 1,
        title: "ok",
        message: ""
    },
    {
        id: 2,
        title: "ko",
        message: ""
    }
]

const messageRouter = Router()

app.get('/', (request, response, next) => {
    response.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>')
})

//No hace falta indicar el prefijo pq se lo indicamos mas abajo en el use
messageRouter.get('', (request, response, next) => {
    return response.json(messages)
})

messageRouter.post('', (request, response, next) => {
    console.log('POST request recibido')
    const newMessage = request.body
    newMessage.id = messages.length + 1
    messages.push(newMessage)

    //Satus 201 para decir que el registro se creo exitosamente
    return response.status(201).json(newMessage)
})

//Indico que todas las rutas que de de alta en el Router van a estar con ese prefijo
app.use('/api/mensajes', messageRouter)

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

app.on('error', (error) => {
    console.log({error})
})