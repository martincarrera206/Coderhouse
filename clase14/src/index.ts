import express from 'express'
import { Request, Response, Express } from 'express'
import Persona from './persona'
import { getTime } from './lib/utils'

const app: Express = express()
const PORT: number = 8080

const p = new Persona('Luis', 'Spinetta')

app.get('/', (request: Request, response: Response) => {
    return response.send({
        time: getTime(),
        name: p.getFullName()
    })
})

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})

app.on('error', (error) => {
    console.log({error})
})