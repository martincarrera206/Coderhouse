/*
//const { db } = require("./models/user")

const usuarios = [
    { nombre: 'Lucas', apellido: 'Blanco', dni: '30355874' },
    { nombre: 'María', apellido: 'García', dni: '29575148' },
    { nombre: 'Tomas', apellido: 'Sierra', dni: '38654790' },
    { nombre: 'Carlos', apellido: 'Fernández', dni: '26935670' }
]

// 2 - Por cli inserto usuarios
use ecommerce
db.usuarios.insertMany(usuarios)
*/

// 3 - Por Node inserto uno mas
const db = require('./db')
const userModel = require('./models/user')

const newUserData =  {
    name: 'Juan',
    lastname: 'Perez',
    email: 'juanperez@gmail.com',
    username: 'juanperez',
    password: 'asdasd'
}

const newUser = new userModel(newUserData)

db
    .then(_ => newUser.save())
    .then(document => console.log('User guardado', document))
    .catch(error => console.error(`Error: ${error.message}`))
    .finally(_ => process.exit())