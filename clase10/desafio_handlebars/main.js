const express = require('express')
let app = express()
const PORT = 8080
//----------------------------------------
// ATENCION! Cambiar esta constante para utilizar los distintos motores
//----------------------------------------
const current_engine = 'ejs' //Valores posibles: pug, ejs, hbs


if(current_engine !== 'pug' && current_engine !== 'ejs' && current_engine !== 'hbs'){
    throw new Error('Motor de platillas no permitido')
}

const { engine } = current_engine == 'hbs' ? require('express-handlebars') : require(current_engine)

// definimos el motor de plantillas a utilizar
app.set('views', './views')
if(current_engine == 'hbs')
    app.engine('hbs',engine({
        extname: '.hbs', // en lugar de .handlebars
        defaultLayout: `${__dirname}/views/index`,
        layoutsDir: `${__dirname}/views/layout`,
        partialsDir: `${__dirname}/views/partials`
    }))

app.set('view engine', current_engine)

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use('/', express.static(__dirname+'/.'))

const productRouter = require(__dirname+'/productRouter')

//Indico que todas las rutas que de de alta en el Router van a estar con ese prefijo
app.use('/productos', productRouter)

app.get('/', (request, response, next) => {
    console.log('GET request recibido index')

    const resp_data = {
        page_title:'Nuevo Producto',
        success_action: '',
        success: 0
    }

    return response.render('layouts/form_product', resp_data)
})

//Middleware de errores
app.use((error, request, response, next) => {
    return response.status(500).json({
        error: error
    })
})

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

app.on('error', (error) => {
    console.log({error})
})
