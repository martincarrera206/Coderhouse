import express, { Request, Response, Express, Router, NextFunction } from 'express'
import { createServer } from "http"
import { Server, Socket } from "socket.io"

const app: Express = express()
const httpServer = createServer(app)
const io = new Server(httpServer);
const PORT: number = 8080

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(express.static('./public'))

app.set('views', './src/views')
app.set('view engine', 'ejs')


// --------- Import Routers -------------

import baseRouter from './routers/baseRouter'
app.use(baseRouter)

import productRouter from './routers/productRouter'
app.use(productRouter)

import kartRouter from './routers/kartRouter'
app.use(kartRouter)

// --------- Middleware Handler : 404 Error -------------

app.use((request:Request, response:Response, next:NextFunction) => {
    const route = request.route
    const method = request.method
    if (!route) return response.status(404).json({ 
        error : -2, 
        descripcion: `Ruta '${route}' método '${method}' no autorizada `
    }) 
    else return next()
});

// --------- All Systems GO! -------------
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})

// --------- "On Error" Catch -------------

app.on('error', (error) => { console.log({generalError: error}) })


let users:Array<any> = []
let messages:Array<any> = []

io.on('connection', (socket) => {

    socket.on('getProducts', (data) => {
        const productos:Array<any> = []//Producto.ar_objetos
        socket.emit('loadProducts', productos)
    })

    /*
    socket.on('saveProduct', data => {
        let product = new Producto(data.title, data.price, data.thumbnail)
        
        product = Producto.create(product)

        socket.emit('loadProduct', product)
        socket.broadcast.emit('loadProduct', product)
    })
    */

    // Chat Events
    socket.on('joinChat', (data) => {
        const user = {
            id: socket.id,
            username: data.username,
            avatarId: Math.ceil(Math.random() * 6)
        }
        users.push(user)
        //console.log({user})
        //console.log({users})
        socket.emit('loadUser', user)
        socket.broadcast.emit('notification', `${user.username} se ha unido a la sala`)
        // io.emit envia a todos los cliente
        io.emit('users', users)
        // socket.broadcast.emit envia a todos los clientes menos el que triggerea el evento
        //socket.broadcast.emit('users', users)
    })

    socket.on('messageInput', data => {
        const now = new Date()
        const user = users.find(user => user.id === socket.id)
        const message = {
          text: data,
          time: `${now.toLocaleString()}`,
          user: user
        }
        messages.push(message)
     
        socket.emit('myMessage', message)
     
        socket.broadcast.emit('message', message)
    })

    socket.on('disconnect', reason => {
        const user = users.find(user => user.id === socket.id)
        users = users.filter(user => user.id !== socket.id)
        if (user) {
          socket.broadcast.emit('notification', `${user.username} se ha ido al chat`)
        }
        io.sockets.emit('users', users)
    })
     
})
