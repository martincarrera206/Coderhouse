const http = require('http')
const server = http.createServer((request, response) => {
    response.end('Hola Mundo')
})
const connectedServer = server.listen(8080, () => {
    console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
})