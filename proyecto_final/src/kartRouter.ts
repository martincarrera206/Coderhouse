import { Router, Request, Response, NextFunction } from 'express'
import Kart from './kart'
import Product from './product'

const kartRouter = Router()

kartRouter.get('/api/carrito', (request:Request, response:Response, next:NextFunction) => {
    console.log('GET kart recibido')

    //Devuelvo todos los carritos
    ;( async (_response:Response) => {
        const carritos = await Kart.getAll()
        return _response.status(201).json({carritos})
    })(response)
})

kartRouter.get('/api/carrito/:id', (request:Request, response:Response, next:NextFunction) => {
    console.log('GET kart by ID recibido')

    //Devuelvo todos los carritos
    ;( async (_request:Request ,_response:Response) => {
        const carrito_id = _request.params.id ? Number( _request.params.id ) : 0

        //Devuelvo un carrito en particular
        const carrito = await Kart.getById(carrito_id)
        if(carrito)  return _response.status(201).json({carrito})
        else return _response.status(404).json({Error: 'No se pudo encontrar el carrito deseado'})
    })(request, response)
})

kartRouter.post('/api/carrito', (request:Request, response:Response, next:NextFunction) => {
    console.log('POST kart recibido')

    ;( async (_request:Request ,_response:Response) => {
        let carrito = new Kart()
        carrito = await carrito.save()
        return _response.status(201).json({kart_id: carrito.getId() })
    })(request, response)
})

kartRouter.delete('/api/carrito/:id', (request:Request, response:Response, next:NextFunction)  => {
    console.log('DELETE kart recibido')

    ;( async (_request:Request ,_response:Response) => {
        const id:number = _request.params.id ? Number( _request.params.id ) : 0
        if(id <=  0){
            return _response.status(404).json({Error: 'No se pudo encontrar el carrito deseado'})
        }

        Kart.deleteById(id)

        return _response.status(204).json({Message: 'Exito al eliminar el carrito'})
    })(request, response)
})

kartRouter.get('/api/carrito/:id/productos', (request:Request, response:Response, next:NextFunction) => {
    console.log('GET kart -> product recibido')

    //Devuelvo todos los productos
    ;( async (_request:Request, _response:Response) => {
        const carrito_id:number = _request.params.id ? Number( _request.params.id ) : 0
        const carrito = await Kart.getById(carrito_id)
        if(carrito){
            const productos = carrito.getProducts()
            return _response.status(201).json({productos})
        }else{
            return _response.status(404).json({Error: 'No se pudo encontrar el carrito deseado'})
        }
    })(request, response)
})

kartRouter.post('/api/carrito/:id/productos', (request:Request, response:Response, next:NextFunction) => {
    console.log('POST kart -> product recibido')

    ;( async (_request:Request ,_response:Response) => {
        const carrito_id:number = _request.params.id ? Number( _request.params.id ) : 0
        let carrito = await Kart.getById(carrito_id)
        if(carrito){
            const id_prod:number = _request.body.id_prod ? Number( _request.params.id_prod ) : 0
            const nombre:string = _request.body.nombre ? String( _request.body.nombre ) : ''
            const precio:number = _request.body.precio ? Number( _request.body.precio ) : 0 
            const foto:string = _request.body.foto ? String( _request.body.foto ) : ''
            const stock:number = _request.body.stock ? Number( _request.body.stock ) : 0
            const descripcion:string = _request.body.descripcion ? String( _request.body.descripcion ) : ''
            const codigo:string = _request.body.codigo ? String( _request.body.codigo ) : ''
    
            const producto = new Product(nombre, descripcion, codigo, precio, foto, stock)
            carrito.addProduct(producto)
            const productos = carrito.getProducts()
            return _response.status(201).json({products: productos })
        }else{
            return _response.status(404).json({Error: 'No se pudo encontrar el producto deseado'})
        }
    })(request, response)
})

kartRouter.put('/api/carrito/:id/productos/:id_prod', (request:Request, response:Response, next:NextFunction)  => {
    console.log('PUT kart -> product recibido')

    ;( async (_request:Request ,_response:Response) => {
        const carrito_id:number = _request.params.id ? Number( _request.params.id ) : 0
        let carrito = await Kart.getById(carrito_id)
        if(carrito){

            const id_prod:number = _request.params.id_prod ? Number( _request.params.id_prod ) : 0
            const nombre:string = _request.body.nombre ? String( _request.body.nombre ) : ''
            const precio:number = _request.body.precio ? Number( _request.body.precio ) : 0 
            const foto:string = _request.body.foto ? String( _request.body.foto ) : ''
            const stock:number = _request.body.stock ? Number( _request.body.stock ) : 0
            const descripcion:string = _request.body.descripcion ? String( _request.body.descripcion ) : ''
            const codigo:string = _request.body.codigo ? String( _request.body.codigo ) : ''

            if(id_prod <=  0){
                return _response.status(404).json({Error: 'No se pudo encontrar el producto dentro del carrito deseado'})
            }

            let producto = await Product.getById(id_prod)
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
        }else{
            return _response.status(404).json({Error: 'No se pudo encontrar el carrito deseado'})
        }
    })(request, response)
})

kartRouter.delete('/api/carrito/:id/productos/:id_prod', (request:Request, response:Response, next:NextFunction)  => {
    console.log('DELETE kart -> product recibido')

    ;( async (_request:Request ,_response:Response) => {
        const carrito_id:number = _request.params.id ? Number( _request.params.id ) : 0
        let carrito = await Kart.getById(carrito_id)
        if(carrito){
            const id_prod:number = _request.params.id_prod ? Number( _request.params.id_prod ) : 0

            if(id_prod <=  0){
                return _response.status(404).json({Error: 'No se pudo encontrar el producto dentro del carrito deseado'})
            }

            carrito.deleteProduct(id_prod)

            return _response.status(204).json({Message: 'Exito al eliminar el producto'})
        }else{
            return _response.status(404).json({Error: 'No se pudo encontrar el carrito deseado'})
        }
    })(request, response)
})

export default kartRouter