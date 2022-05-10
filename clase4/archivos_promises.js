const fs = require('fs')

const contenido = `Esto es una prueba async con promesas en NodeJS
Segunda linea
`
const contenidoExtra = `ESto es un agregado`

fs.promises.readFile('./test-input-promises.txt', 'utf-8')
    .then(data => {
        console.log(data)
        return fs.promises.writeFile('./test-input-promises.txt', contenido)
    })
    .then(() => {
        console.log('Archivo generado')
        return fs.promises.appendFile('./test-input-promises.txt', contenidoExtra)
    })
    .then(() => {
        console.log('Archivo actualizado')
        return fs.promises.rename('./test-input-promises.txt', './test-input-promises-nuevo.txt')
    })
    .then(() => {
        console.log('Archivo renombrado')
        return fs.promises.rename('./test-input-promises-nuevo.txt', './test-input-promises.txt')
    })
    .catch(error => {
        console.log(error)
    })

// Con funcioines async
/*
;(async () => {
    try {
        const data = await fs.promises.readFile('./test-input-promises.txt', 'utf-8')
        console.log(data)
        await fs.promises.writeFile('./test-input-promises.txt', contenido)
        console.log('Archivo generado')
        await fs.promises.appendFile('./test-input-promises.txt', contenidoExtra)
        console.log('Archivo actualizado')
        await fs.promises.rename('./test-input-promises.txt', './test-input-promises-nuevo.txt')
        console.log('Archivo renombrado')
        await fs.promises.rename('./test-input-promises-nuevo.txt', './test-input-promises.txt')

    } catch (error) {
        console.log(error)
    }
})()
*/