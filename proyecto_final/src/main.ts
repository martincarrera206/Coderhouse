import express from 'express'
import { Request, Response, Express, NextFunction } from 'express'

const app: Express = express()
const PORT: number = 8080

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

import productRouter from './productRouter'
app.use(productRouter)

import kartRouter from './kartRouter'
app.use(kartRouter)

/*
app.get('/', (request: Request, response: Response) => {
    //Mostrar index con vista de productos
})
*/

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})

app.use(function(request:Request, response:Response, next:NextFunction) {
    // SI no existe la ruta
    if (!request.route) return response.status(404).json({ 
        error : -2, 
        descripcion: `Ruta '${request.originalUrl}' método '${request.method}' no autorizada `
    }) 

    return next()
});

app.on('error', (error) => {
    console.log({generalError: error})
})