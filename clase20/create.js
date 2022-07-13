const db = require('./db')
const userModel = require('./models/user')

const userData =  {
    name: 'Juan',
    lastname: 'Perez',
    email: 'juanperez@gmail.com',
    username: 'juanperez',
    password: 'asdasd'
}

const user = new userModel(userData)

db
    .then(_ => user.save())
    .then(document => console.log('User saved', document))
    .catch(error => console.error(`Error: ${error.message}`))
    .finally(_ => process.exit())