import express from 'express'
import { Router, Request, Response, NextFunction } from 'express'
import Product from './product'
import isAuthorized from './auth'

const productRouter = Router()

productRouter.get('/api/productos', (request:Request, response:Response, next:NextFunction) => {
    console.log('GET product recibido')

    //Devuelvo todos los productos
    ;( async (_response:Response) => {
        const productos = await Product.getAll()
        return _response.status(201).json({productos})
    })(response)
})

productRouter.get('/api/productos/:id', (request:Request, response:Response, next:NextFunction) => {
    console.log('GET product by ID recibido')

    //Devuelvo todos los productos
    ;( async (_request:Request ,_response:Response) => {
        const product_id = _request.params.id ? Number( _request.params.id ) : 0

        //Devuelvo un producto en particular
        const producto = await Product.getById(product_id)
        if(producto) return _response.status(201).json({producto})
        else return _response.status(404).json({Error: 'No se pudo encontrar el producto deseado'})
        
    })(request, response)
})

productRouter.post('/api/productos', isAuthorized, (request:Request, response:Response, next:NextFunction) => {
    console.log('POST product recibido')

    ;( async (_request:Request ,_response:Response) => {

        const nombre:string = _request.body.nombre ? String( _request.body.nombre ) : ''
        const precio:number = _request.body.precio ? Number( _request.body.precio ) : 0 
        const foto:string = _request.body.foto ? String( _request.body.foto ) : ''
        const stock:number = _request.body.stock ? Number( _request.body.stock ) : 0
        const descripcion:string = _request.body.descripcion ? String( _request.body.descripcion ) : ''
        const codigo:string = _request.body.codigo ? String( _request.body.codigo ) : ''

        let producto = new Product(nombre, descripcion, codigo, precio, foto, stock)
        producto = await producto.save()
        return _response.status(201).json({product: producto })

    })(request, response)
})

productRouter.put('/api/productos/:id', isAuthorized, (request:Request, response:Response, next:NextFunction)  => {
    console.log('PUT product recibido')

    ;( async (_request:Request ,_response:Response) => {

        const id:number = _request.params.id ? Number( _request.params.id ) : 0
        const nombre:string = _request.body.nombre ? String( _request.body.nombre ) : ''
        const precio:number = _request.body.precio ? Number( _request.body.precio ) : 0 
        const foto:string = _request.body.foto ? String( _request.body.foto ) : ''
        const stock:number = _request.body.stock ? Number( _request.body.stock ) : 0
        const descripcion:string = _request.body.descripcion ? String( _request.body.descripcion ) : ''
        const codigo:string = _request.body.codigo ? String( _request.body.codigo ) : ''

        if(id <=  0){
            return _response.status(404).json({Error: 'No se pudo encontrar el producto deseado'})
        }

        let producto = await Product.getById(id)
        if(producto){
            producto.setNombre(nombre)
            producto.setPrecio(precio)
            producto.setFoto(foto)
            producto.setStock(stock)
            producto.setDescripcion(descripcion)
            producto.setCodigo(codigo)
            producto.update()
            return _response.status(201).json({product: producto})
        }else{
            return _response.status(404).json({Error: 'No se pudo encontrar el producto deseado'})
        }
    })(request, response)
})

productRouter.delete('/api/productos/:id', isAuthorized, (request:Request, response:Response, next:NextFunction)  => {
    console.log('DELETE product recibido')

    ;( async (_request:Request ,_response:Response) => {
        const id:number = _request.params.id ? Number( _request.params.id ) : 0
        if(id <=  0){
            return _response.status(404).json({Error: 'No se pudo encontrar el producto deseado'})
        }

        Product.deleteById(id)

        return _response.status(204).json({Message: 'Exito al eliminar el producto'})
    })(request, response)
})

export default productRouter