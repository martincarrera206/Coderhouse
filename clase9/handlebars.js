const express = require('express')
const app = express()
const PORT = 8080

const { engine } = require('express-handlebars')

// establecemos la configuración de handlebars
app.engine('hbs',engine({
 extname: '.hbs', // en lugar de .handlebars
 defaultLayout: `${__dirname}/views/index.hbs`,
 layoutsDir: `${__dirname}/views/layouts`,
 partialsDir: `${__dirname}/views/partials`
}))

// definimos el motor de plantillas a utilizar
app.set('view engine', 'hbs')
app.set('views', './views')

const alumnos = [
    { nombre: 'Aaron', apellido: 'Jallaza' },
    { nombre: 'Agustina', apellido: 'Prats' },
    { nombre: 'Alan', apellido: 'Mathiasen' },
    { nombre: 'Alejandro', apellido: 'Zapata' },
    { nombre: 'Benjamin', apellido: 'Hernandez' }
]
   

app.get('/', (request, response) => {
    const data = {
        comision: 30975, 
        alumnos
    }
    return response.render('layouts/main', data)
})

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

app.on('error', (error) => {
    console.log({error})
})