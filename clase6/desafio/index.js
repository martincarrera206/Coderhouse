const express = require('express')
const Contenedor = require('./contenedor.js')

let app = express()
const contenedorProductos = new Contenedor('./productos.txt')

app.get('/', (request, response, next) => {
    response.send(`Bienvenido a mi desafio:<br>
    <a href="productos">Ver Productos</a><br>
    <a href="productoRandom">Ver Producto Random</a>` )
})

app.get('/productos', (request, response, next) => {
    ;(async () => {
        const all_productos = await contenedorProductos.getAll()
        response.send(JSON.stringify(all_productos) )
    })()
})

app.get('/productoRandom', (request, response, next) => {
    ;(async () => {
        const all_productos = await contenedorProductos.getAll()
        const random_index = Math.floor(Math.random() * all_productos.length)
        response.send(JSON.stringify(all_productos[random_index]) )
    })()
})

const coneccion = app.listen(8080, () => {
    console.log(`Servidor Http escuchando en el puerto ${coneccion.address().port}`)
})

app.on('error', (error) => {
    console.log({error})
})