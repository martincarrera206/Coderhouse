import { Router, Request, Response, NextFunction } from 'express'

const baseRouter:Router = Router()

baseRouter.get('/', (request:Request, response:Response, next:NextFunction) => {
    console.log('GET request recibido index')

    const resp_data = {
        page_title:'Nuevo Producto',
        success_action: '',
        success: 0,
        productos : []
    }

    return response.render('index', resp_data)
})

baseRouter.get('/productos', (request:Request, response:Response, next:NextFunction) => {
    console.log('GET request recibido')
    const productos = []//Producto.ar_objetos

    const resp_data = {
        productos: productos,
        page_title: 'Listado de Productos'
    }

    return response.status(201).render('list_products', resp_data)
})

baseRouter.get('/admin', (request:Request, response:Response, next:NextFunction) => {
    console.log('GET request recibido')
    const productos = []//Producto.ar_objetos

    const resp_data = {
        productos: productos,
        page_title: 'Panel de Administrador'
    }

    return response.status(201).render('admin', resp_data)
})

baseRouter.get('/chat', (request:Request, response:Response, next:NextFunction) => {
    return response.status(201).render('chat')
})

export default baseRouter