const express = require('express')
const app = express()
const PORT = 8080

const { engine } = require('pug')

// definimos el motor de plantillas a utilizar
//app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', './views')

/*
app.get('/', (request, response) => {
    return response.status(204).json({message: 'Test OK'})
})
*/

/*
//Renders con PUG Js
app.get('/hello', (request, response) => {
    const data = {
        mensaje : 'Esto es un mensaje con PUG'
    } 
    return response.render('hello', data)
})

app.get('/datos', (request, response) => {
    const data = {
        min : request.query.min,
        max : request.query.max,
        nivel : request.query.nivel,
        titulo : request.query.titulo
    } 
    console.log({data})
    return response.render('meter', data)
})
*/


//Renders con EJS
app.get('/', (request, response) => {
    return response.render('index', { comision: 30975 })
})

app.get('/message', (request, response) => {
    const data = {
      message: {
        name: 'Aprendiendo EJS'
      }
    }
    return response.render('message', data)
})

app.get('/alumnos', (request, response) => {
    const alumnos = [
        { nombre: 'Aaron', apellido: 'Jallaza' },
        { nombre: 'Agustina', apellido: 'Prats' },
        { nombre: 'Alan', apellido: 'Mathiasen' },
        { nombre: 'Alejandro', apellido: 'Zapata' },
        { nombre: 'Benjamin', apellido: 'Hernandez' }
    ]
    
    const data = {
        comision: 30975,
        alumnos
    }
    return response.render('alumnos', data)
})
   

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

app.on('error', (error) => {
    console.log({error})
})