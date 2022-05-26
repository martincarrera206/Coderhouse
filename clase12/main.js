const { response } = require('express')
const express = require('express')
const { Server: HttpServer, request } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))

app.set('views', './views')
app.set('view engine', 'ejs')

const PORT = 8080

let users = []
let messages = []

app.get('/login', (request, response) => {
    return response.render('login')
})

app.post('/login', (request, response) => {
    const { username } = request.body
    return response.redirect(`/chat?username=${username}`)
})

app.get('/chat', (request, response) => {
    
    response.render('chat')
})

httpServer.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})

httpServer.on('error', (error) => {
    console.log({error})
})

io.on('connection', (socket) => {
    //Catch de Evento joinChat
    socket.on('joinChat', (data) => {
        users.push({
          id: socket.id,
          username: data.username,
          avatarId: Math.ceil(Math.random() * 6)
        })
        socket.emit('notification', `Bienvenido ${data.username}`)
        socket.broadcast.emit('notification', `${data.username} se ha unido al chat`)
        io.sockets.emit('users', users)
    })

    socket.on('users', data => {
        const users = data
          .map(user => {
            const userElement = `
              <li class="clearfix">
                  <img src="https://bootdey.com/img/Content/avatar/avatar${user.avatarId}.png" alt="avatar">
                  <div class="about">
                      <div class="name">${user.username}</div>
                      <div class="status"> <i class="fa fa-circle online"></i> online</div>                                           
                  </div>
              </li>`
            return userElement
          })
          .join('')
       
        usersContainer.innerHTML = users
    })

    socket.on('messageInput', data => {
        const now = new Date()
        const user = users.find(user => user.id === socket.id)
        const message = {
          text: data,
          time: `${now.getHours()}:${now.getMinutes()}`,
          user
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