const express = require('express')
const app = express()
const PORT = 8080

//Para acceder a los archivos deberiamos ir a localhost:8080/static/fruit.svg
//__dirname es el path absoluto donde esta el archivo
app.use('/static', express.static(__dirname+'/public'))

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

server.on('error', (error) => { console.log({error}) })