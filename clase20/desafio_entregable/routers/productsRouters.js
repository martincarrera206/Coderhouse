const {Router} = require('express')
const productRouter = Router()
const ContenedorArchivo = require('../contenedores/ContenedorArchivo')

const contenedorArchivoProductos = new ContenedorArchivo('./data/products.json')

productRouter.get('', (request, response, next) => {
    return contenedorArchivoProductos.getAll()
        .then(products => {
            console.log(products)
            return response.status(201).json({products})
        })
})

productRouter.get('/:id', (request, response, next) => {
    console.log('GET request recibido')
    const id = request.params.id ? Number.parseInt(request.params.id) : 0    
    return contenedorArchivoProductos.getById(id)
        .then(product => {
            if(!product){
                return response.status(404).json({
                    error: "producto no encontrado"
                })
            }
            return response.status(201).json({product})
        })
})

productRouter.post('', (request, response, next) => {
    console.log('POST request recibido')
    let product = new Producto(request.body.title, request.body.price, '')

    const file = request.file
    //console.log({file})
    if(file) product.thumbnail = 'public/productos/'+file.filename
    //console.log({file: request.file})
    
    product = Producto.create(product)
    
    const resp_data = {
        page_title:'Nuevo Producto',
        success: 1,
        success_action: 'guardar'
    }

    //Satus 201 para decir que el registro se creo exitosamente
    return response.status(201).render('layouts/form_product', resp_data)
})

productRouter.put('/:id', (request, response, next) => {
    console.log('PUT request recibido')
    const id = Number.parseInt(request.params.id)
    let product = Producto.getById(id)
    if(product === null) return response.status(404).json({
        error: "producto no encontrado"
    })

    const file = request.file
    if(file) product.thumbnail = 'public/productos/'+file.filename

    product.title = request.body.title
    product.price = request.body.price
    Producto.update(product)

    const resp_data = {
        page_title:'Nuevo Producto',
        success: 1,
        success_action: 'guardar'
    }
    //Satus 201 para decir que el registro se creo exitosamente
    return response.status(201).render('layouts/form_product', resp_data)
})

productRouter.delete('/:id', (request, response, next) => {
    console.log('DELETE request recibido')
    const id = Number.parseInt(request.params.id)
    let product = Producto.getById(id)
    if(product === null) return response.status(404).json({
        error: "producto no encontrado"
    })

    if(!Producto.deleteById(id)){
        return response.status(404).json({
            error: "producto no encontrado"
        })
    }

    const resp_data = {
        message: "Exito al eliminar",
        product: product
    }

    //Satus 201 para decir que el registro se creo exitosamente
    return response.status(201).render('layouts/list_product', resp_data)
})

module.exports = productRouter