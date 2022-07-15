const express = require('express')
const knex = require('knex')
const db = require('./db.js')
const cache = require('./cache.js')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/products', (req, res) => {
    let createCache = false
    return cache.getProducts()
        .then(productsString => {
            // Respuesta de promesa en cache
            if(productsString === null){
                createCache = true // Indicamos que necesitamos guardar la variable ne cache
                console.log('busca en la BD')
                return db.getProducts()
            }
            console.log('parsea datos del cache')
            return JSON.parse(productsString)
        })
        .then(products => {
            // Guardamos en cache para las proximas request
            // No hace falta cachear esta promesa pq es un "flujo secundario", no influye el resultado para el cliente
            if(createCache) cache.setProducts(products)

            return res.json({products})
        })
})

app.post('/products', (req, res) => {
    let product = {
        name: req.body.name,
        price: req.body.price,
        decription: req.body.decription,
        stock: req.body.stock,
        category_id: req.body.category_id     
    }
    return db.createProduct(product)
        .then(productsId => {
            product.id = productsId[0]
            cache.removeProducts() // elimina el cache para luego ser actualizado con el proximo get de products
            return res.status(201).json({product})
        })
})

const PORT = 8080
app.listen(PORT, () => console.log(`Servidor Http escuchando en el puerto ${PORT}`))
app.on('error', (error) => {
    console.log({error})
})