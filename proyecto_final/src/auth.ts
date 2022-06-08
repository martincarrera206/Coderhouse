import { Request, Response, NextFunction } from 'express'

// ---- Cambiar aca variable para acceder como admin o no ----
const isAdmin:boolean = true
// -----------------------------------------------------------

function isAuthorized(request:Request, response:Response, next:NextFunction){
    if(isAdmin) return next()
    else return response.status(405).json({
        error : -1, 
        descripcion: `Ruta '${request.originalUrl}' método '${request.method}' no autorizada `,
        fromIP: request.ip
    })
}

export default isAuthorized