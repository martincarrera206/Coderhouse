const express = require('express')
const { Router } = express //Esto es igual a const Router = express.Router
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/productos')
    },
    filename: (req, file, cb) => {
        //Para usar el nombre original
        //cb(null, `${Date.now()}-${file.originalname}.jpg`) 
        cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
})

const upload = multer({ storage })

const Producto = require(__dirname+'/product')

const productRouter = Router()

//No hace falta indicar el prefijo pq se lo indicamos mas abajo en el use
productRouter.get('', (request, response, next) => {
    console.log('GET request recibido')
    const productos = Producto.ar_objetos

    const resp_data = {
        productos: productos,
        page_title: 'Listado de Productos'
    }

    return response.status(201).render('layouts/list_products', resp_data)
})

productRouter.get('/:id', (request, response, next) => {
    console.log('GET request recibido')
    const id = Number.parseInt(request.params.id)
    let product = Producto.getById(id)
    if(!product){
        return response.status(404).json({
            error: "producto no encontrado"
        })
    }
    return response.status(201).json(product)
})

productRouter.post('', upload.single('thumbnail'), (request, response, next) => {
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

productRouter.put('/:id', upload.single('thumbnail'), (request, response, next) => {
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