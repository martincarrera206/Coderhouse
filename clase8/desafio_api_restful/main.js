const express = require('express')

let app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use('/', express.static(__dirname+'/public'))

const productRouter = require(__dirname+'/productRouter')

//Indico que todas las rutas que de de alta en el Router van a estar con ese prefijo
app.use('/api/productos', productRouter)

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
