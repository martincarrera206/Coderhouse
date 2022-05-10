const fs = require('fs')

const contenido = `Esto es una prueba async con NodeJS
Segunda linea
`
const contenidoExtra = `ESto es un agregado`

fs.readFile('./test-input-async.txt', 'utf-8', (err, data) => {
    if(err){
        console.log(err)
    }else{
        console.log(data)
        fs.writeFileSync('./test-input-async.txt', contenido, err => {
            if(err){
                console.log(err)
            }else{
                console.log('Archivo escrito')
                fs.appendFileSync('./test-input-async.txt', contenidoExtra, err => {
                    if(err){
                        console.log(err)
                    }else{
                        console.log('Archivo actualizado')
                    }
                })
            }
        })
    }
})