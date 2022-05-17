const express = require('express')
let app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

let mensajes = [
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
];

app.get('/', (request, response, next) => {
    response.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>')
})
app.get('/api/mensajes', (request, response, next) => {
    console.log('GET request recibido')
    if(!request.query.title){
        return response.json(mensajes)
    }
    
    const mensajesFiltrados = mensajes.filter(msj => msj.title === request.query.title)
    return response.json(mensajesFiltrados)
})
app.get('/api/mensajes/:id', (request, response, next) => {
    console.log('GET request recibido')
    const mensajeBuscado = mensajes.find(msj => msj.id == request.params.id)
    if(!mensajeBuscado) return response.status(404).json({
        error: "Mensaje no encontrado"
    })
    return response.json(mensajeBuscado)
})

app.post('/api/mensajes', (request, response, next) => {
    console.log('POST request recibido')
    const newMessage = request.body
    newMessage.id = mensajes.length + 1
    mensajes.push(newMessage)

    //Satus 201 para decir que el registro se creo exitosamente
    return response.status(201).json(newMessage)
})

app.put('/api/mensajes/:id', (request, response, next) => {
    console.log('PUT request recibido')
    const id = Number.parseInt(request.params.id)
    const mensajeIndex = mensajes.find(msj => msj.id == id)
    if(mensajeIndex === -1) return response.status(404).json({
        error: "Mensaje no encontrado"
    })

    mensajes[mensajeIndex].title = request.body.title
    mensajes[mensajeIndex].message = request.body.message

    return response.json(mensajes)
})

app.delete('/api/mensajes/:id', (request, response, next) => {
    console.log('DELETE request recibido')
    const id = Number.parseInt(request.params.id)
    const mensajeIndex = mensajes.find(msj => msj.id == id)
    if(mensajeIndex === -1) return response.status(404).json({
        error: "Mensaje no encontrado"
    })

    mensajes = mensajes.filter(msj => msj.id !== id)

    //Status 204 - Exito al realizar operacion pero no tengo info relevante para devolver
    return response.status(204).json(mensajes)
})

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

app.on('error', (error) => {
    console.log({error})
})