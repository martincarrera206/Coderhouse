const express = require('express')
let app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))

//---------------------

/*
app.get('/', (request, response) => {
    return response.render('form')
})
*/
   
const users = []

app.post('/form', (request, response) => {
    //console.log(request)
    const user = request.body
    user.id = users.length + 1
    //console.log({user})
    users.push(user)
    //console.log({users})

    return response.json(user)
})

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

app.on('error', (error) => {
    console.log({error})
})