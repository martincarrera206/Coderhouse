import express from 'express'
import { Request, Response, Express } from 'express'
import { getTime } from './lib/utils'
import Perimetro from './perimetro'

const app: Express = express()
//Para manejar puertos en glitch usar process.env.PORT
const PORT: any = process.env.PORT || 8080

const isAdmin = true
//validar con middleware

type CuadradoParametros = {
    lado: number
}
type RectanguloParametros = {
    base: number,
    altura: number
}
type CirculoParametros = {
    diametro: number
}

type Resultado = {
    tipo: string,
    figura: string,
    parametros?: CuadradoParametros|RectanguloParametros|CirculoParametros,
    resultado?: number
}


app.get('/perimetro/:figura', (request: Request, response: Response) => {
    const resultado: Resultado = {
        tipo: 'Perimetro',
        figura: request.params.figura
    }

    switch (request.params.figura) {
        case 'cuadrado':
            const lado = request.query.lado ? Number(request.query.lado) : 0
            resultado.parametros = {
                lado: lado
            }
            resultado.resultado = Perimetro.cuadrado(lado)
            break
        case 'rectangulo':
            const base = request.query.base ? Number(request.query.base) : 0
            const altura = request.query.altura ? Number(request.query.altura) : 0
            resultado.parametros = {
                base: base,
                altura: altura
            }
            resultado.resultado = Perimetro.rectangulo(base, altura)
            break
        case 'circulo':
            const diametro = request.query.diametro ? Number(request.query.diametro) : 0
            resultado.parametros = {
                diametro: diametro
            }
            resultado.resultado = Perimetro.circulo(diametro)
            break
    
        default:
            break
    }
    return response.status(201).json(resultado)
})

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})

app.on('error', (error) => {
    console.log({error})
})