const { response, next, Router } = require('express')
const express = require('express')
const { Server: HttpServer, request } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(express.static('./public'))

const options = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'clase16'
    }
}
const knex = require('knex')(options)

// Aca creamos un modulo que devuelva una funcion para reutilizar la coneccion de socket
const productRouterFn = require('./routers/productRouterFn')
//De esta forma podemos tener una coneccion de socket persistente en todas las rutas
const productRouter = productRouterFn(io)

// ------- ROUTES ------------

app.get('', (request, response, next) => response.json({status: 'ok'}))


app.use('/api/productos', productRouter)

// ---------- GO LIVE --------

httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})