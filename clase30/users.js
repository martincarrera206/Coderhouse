const express = require('express')

const app = express()

const PORT = process.argv[2] || 8080

app.get('/users', (req, res) => {
    console.log('Request to user api')
    res.json({
        status: 'ok',
        api: 'users'
    })
})

app.listen(PORT)

