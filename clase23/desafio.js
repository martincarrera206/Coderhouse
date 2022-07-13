const express = require('express')
const cookieParser = require('cookie-parser')
const PORT = 8080

const app = express()

// Se le pasa una "palabra" secreta para encriptar las cookies
app.use(cookieParser('qwerty'))

// Para setear las cookies (con o sin "tiempo maximo")
app.get('/cookies', (req, res) => {
    let cookies = req.cookies ? req.cookies : null
    cookies = req.signedCookies ? req.signedCookies : null
    if(!cookies) return res.json({ error: 'No hay cookies seteados' })

    return res.json({ cookies, proceso: 'ok'})
})

app.post('/cookies', (req, res) => {
    const cookieName = req.body.name ? req.body.name : null
    const cookieValue = req.body.value ? req.body.value : null
    const cookieTime = req.body.time ? Number.parseInt( req.body.time ) : null
    if(!cookieValue || !cookieName) 
        return res.json({ error: 'falta nombre ó valor' })

    let cookieOption = {signed: true}
    if(cookieTime) cookieOption.maxAge = cookieTime

    return res.cookie(addCookie.name, addCookie.value, cookieOption).json({ proceso: 'ok'})
})

app.delete('/cookies', (req, res) => {
    const cookieName = req.query.name ? req.query.name : ''
    if(cookieName.trim() == '')
        return res.json({ error: 'nombre no encontrado' })

    return res.clearCookie(cookieName).json({ proceso: 'ok'})
})

app.listen(PORT, () => console.log(`Servidor Http escuchando en el puerto ${PORT}`))

app.on('error', (error) => {
    console.log({error})
})
