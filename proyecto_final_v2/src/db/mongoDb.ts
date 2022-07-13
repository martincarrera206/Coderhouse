const mongoose = require('mongoose')
const username = encodeURIComponent("mcarrera");
const password = process.env.MONGODB_PASSWORD || encodeURIComponent("5rMvafY7sRXpxt");
const dataBase = encodeURIComponent("ecommerce");
const URL_CONNECT = `mongodb+srv://${username}:${password}@cluster0.mkluq1v.mongodb.net/${dataBase}?retryWrites=true&w=majority`

const connection = mongoose.connect(URL_CONNECT, {
    useNewUrlParser: true
})

module.exports = connection