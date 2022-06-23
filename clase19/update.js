const db = require('./db')
const userModel = require('./models/user')

db
    .then(_ => {
        return userModel.updateOne({
            username: 'juanperez'
        },{
            $set: { password: '123456'}
        })
    })
    .then(document => console.log('User updated', document))
    .catch(error => console.error(`Error: ${error.message}`))
    .finally(_ => process.exit())