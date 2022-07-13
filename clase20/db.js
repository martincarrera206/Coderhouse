const mongoose = require('mongoose')
const username = encodeURIComponent("mcarrera");
const password = process.env.MONGODB_PASSWORD || encodeURIComponent("5rMvafY7sRXpxt");
const dataBase = encodeURIComponent("clase20");
const URL = `mongodb+srv://${username}:${password}@cluster0.mkluq1v.mongodb.net/${dataBase}?retryWrites=true&w=majority`

const connection = mongoose.connect(URL, {
    useNewUrlParser: true
})

module.exports = connection