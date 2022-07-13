const express = require('express')
const cookieParser = require('cookie-parser')
const PORT = 8080

const app = express()

// Se le pasa una "palabra" secreta para encriptar las cookies
app.use(cookieParser('qwerty'))

// Para setear las cookies (con o sin "tiempo maximo")
app.get('/set', (req, res) => {
    res.cookie('server', 'express').send('Cookie set')
})

app.get('/setEx', (req, res) => {
    res.cookie('server2', 'express2', {maxAge: 30000}).send('Cookie set')
})

app.get('/set-signed', (req, res) => {
    res.cookie('serverSigned', 'expressSigned', {signed: true}).send('Cookie set')
})

// Para leer las cookies
app.get('/get', (req, res) => {
    res.send({
        server: req.cookies.server,
        server2: req.cookies.server2,
        serverSigned: req.signedCookies.serverSigned
    })
})

// Para eliminar las cookies
app.get('/clear', (req, res) => {
    res.clearCookie('server').send('Cookie clear')
})

app.listen(PORT, () => console.log(`Servidor Http escuchando en el puerto ${PORT}`))

app.on('error', (error) => {
    console.log({error})
})
