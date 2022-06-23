const db = require('./db')
const userModel = require('./models/user')

db
    .then(_ => userModel.findOne({ username: 'juanperez'}))
    .then(user => {
        user.password = 'qwerty'
        return user.save()
    })
    .then(document => console.log('User updated', document))
    .catch(error => console.error(`Error: ${error.message}`))
    .finally(_ => process.exit())