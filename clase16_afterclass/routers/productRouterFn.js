const { response, next, Router } = require('express')

const adminMiddleware = (request, response, next) => {
    if(request.query.admin === 'true'){
        console.log('Acceso admin')
        return next()
    }
    console.log('Acceso indebido')
    return response.status(401).json({
        error: 'Ud no tiene acceso a esta seccion'
    })
}

const productRouterFn = (io) => {
    const productRouter = Router()

    productRouter.use(adminMiddleware)

    productRouter.get('/', (request, response, next) => {
        return knex.from('products').select('*')
            .then(products => {
                console.log(`Total de productos: ${products.length}`)
                const productsFiltered = products.map((product) => {
                    delete product.stock
                    return product
                })
                return response.status(201).json({products})
            })
            .catch(err => {
                console.log(`Error: ${err.message}`)
                return response.status(500).json({
                    error: 'Error de servidor'
                })
            })
            // En caso practico no se debe cerrar la coneccion
            // Sino solo sirve para la primera peticion y la segunda tira error
            //.finally(() => knex.destroy())
    })

    productRouter.post('/', (request, response, next) => {
        const product = {
            name : request.body.name ? request.body.name : '',
            price : request.body.price,
            decription : request.body.decription,
            stock : request.body.stock,
            category_id : request.body.category_id
        }

        //Aca no devuelve nada pero es bueno indicarle al codigo que termine dsp de ejecutar esta promesa
        return knex('products')
            .insert(product)
            .then(productIds => {
                console.log({product})
                const [productId] = productIds
                product.id = productId

                //Aca reutilizamos la coneccion de socket que nos pasa el server.js
                io.sockets.emit('newProduct', product)
                return response.status(201).json({product})
            })
            .catch(err => {
                console.log(`Error: ${err.message}`)
                return response.status(500).json({
                    error: 'Error de servidor'
                })
            })
    })
    return productRouter
}

module.exports = productRouterFn