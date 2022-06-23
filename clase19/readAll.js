const db = require('./db')
const userModel = require('./models/user')

db
    .then(_ => userModel.find())
    .then(users => console.log({users}))
    .catch(error => console.error(`Error: ${error.message}`))
    .finally(_ => process.exit())