const express = require('express')

const app = express()

const PORT = process.argv[2] || 8081

app.get('/products', (req, res) => {
    console.log('Request to products api')
    res.json({
        status: 'ok',
        api: 'products'
    })
})

app.listen(PORT)

