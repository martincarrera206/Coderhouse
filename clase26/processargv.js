//console.log(process.argv)
/*
node .\processargv.js
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Martin\\Proyects\\Coderhouse\\clase26\\processargv.js'
]
node .\processargv.js 1 2 3 -n martin -h localhost
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\Martin\\Proyects\\Coderhouse\\clase26\\processargv.js',
  '1',
  '2',
  '3',
  '-n',
  'martin',
  '-h',
  'localhost'
]
*/

//Comenzamos desde la posicion 2 pq los primeros 2 pertenecen al runtime y no nos sirven
console.log(`Argumentos del script recibidos:`)
for (let index = 2; index < process.argv.length; index++) {
    const arg = process.argv[index]
    if(arg === '--help' || arg === '-h'){
        console.log(`Este script muestra todos los argumentos recibidos por linea de comando`)
        return
    }

    console.log(`${index} => ${process.argv[index]}`)
}

const parseArgs = require('minimist')
const args = parseArgs(process.argv.slice(2))

console.log(`Argumentos del script parseado con la libreria minimist:`)
console.log(args)


console.log(`Probando la libreria minimist:`)
console.log(parseArgs(['1', '2', '3', '4']));
// { _: [ 1, 2, 3, 4 ] }
console.log(parseArgs(['-a', '1', '-b', '2', '3', '4']));
// { _: [ 3, 4 ], a: 1, b: 2 }
console.log(parseArgs(['--n1', '1', '--n2', '2', '3', '4']));
// { _: [ 3, 4 ], n1: 1, n2: 2 }
console.log(parseArgs(['-a', '1', '-b', '2', '--colores', '--cursiva']));
// { _: [], a: 1, b: 2, colores: true, cursiva: true }
console.log(parseArgs(['-a', '1', '-b', '2', '-c', '-x']));
// { _: [], a: 1, b: 2, c: true, x: true }


console.log(`Probando opciones en minimist:`)
let options1 = { default: { nombre: 'pepe', apellido: 'copado' }}
console.log(parseArgs(['-a', '1', '-b', '2', 'un-valor-suelto', '--nombre', 'juanita'], options1));
// { _: [ 'un-valor-suelto' ], a: 1, b: 2, nombre: 'juanita', apellido: 'copado' }

let options2 = { alias: { a: 'campoA', b: 'campoB', } }
console.log(parseArgs(['-a', '1', '-b', '2'], options2));
// { _: [], a: 1, campoA: 1, b: 2, campoB: 2 }
