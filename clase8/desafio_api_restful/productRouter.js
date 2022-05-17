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
    return response.status(201).json(Producto.ar_objetos)
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
    if(file) product.thumbnail = 'productos/'+file.filename
    //console.log({file: request.file})
    
    product = Producto.create(product)

    //Satus 201 para decir que el registro se creo exitosamente
    return response.status(201).json(product)
})

productRouter.put('/:id', upload.single('thumbnail'), (request, response, next) => {
    console.log('PUT request recibido')
    const id = Number.parseInt(request.params.id)
    let product = Producto.getById(id)
    if(product === null) return response.status(404).json({
        error: "producto no encontrado"
    })

    const file = request.file
    if(file) product.thumbnail = 'productos/'+file.filename

    product.title = request.body.title
    product.price = request.body.price
    Producto.update(product)

    return response.status(201).json(product)
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

    //Status 204 - Exito al realizar operacion pero no tengo info relevante para devolver
    return response.status(204).json({message: "Exito al eliminar"})
})

module.exports = productRouter