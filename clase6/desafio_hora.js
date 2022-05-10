const http = require('http')
const moment = require('moment')

const server = http.createServer((request, response) => {
    const now = moment()
    const hora_actual = now.hour()
    if(hora_actual >= 6 && hora_actual <= 12)
        response.end('Buenos Dias!')
    if(hora_actual >= 13 && hora_actual <= 19)
        response.end('Buenas Tardes!')
    if(hora_actual >= 20 && hora_actual <= 5)
        response.end('Buenas Noches!')
    //if(hora_actual)
    //response.end('Hola Mundo')
})
const connectedServer = server.listen(8080, () => {
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
})