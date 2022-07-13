const express = require('express')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

const productRouter = require('./routers/productsRouters')

app.use('/api/productos', productRouter)


app.listen(PORT, () => console.log(`Servidor Http escuchando en el puerto ${PORT}`))

app.on('error', (error) => {
    console.log({error})
})
