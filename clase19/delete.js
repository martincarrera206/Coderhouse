const db = require('./db')
const userModel = require('./models/user')

db
    .then(_ => {
        return userModel.deleteOne({
            username: 'juanperez'
        })
    })
    .then(document => console.log('User eliminado', document))
    .catch(error => console.error(`Error: ${error.message}`))
    .finally(_ => process.exit())