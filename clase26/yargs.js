//node main.js 1 2 3 -m dev -p 8080 -d

const yargs = require('yargs/yargs')
const args = yargs(process.argv.slice(2))
    .default({
        nombre: 'Diego',
        apellido: 'Maradona'
    })
    .alias({
        n: 'nombre',
        a: 'apellido'
    })
    .boolean('debug')
    .argv

console.log(args)