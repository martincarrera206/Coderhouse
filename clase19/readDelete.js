const db = require('./db')
const userModel = require('./models/user')

db
    .then(_ => userModel.findOne({ username: 'juanperez'}))
    .then(user => {
        // Si no existe el documento buscado devuelve null
        if(!user) return user
        return user.remove()
    })
    .then(document => console.log('User eliminado', document))
    .catch(error => console.error(`Error: ${error.message}`))
    .finally(_ => process.exit())