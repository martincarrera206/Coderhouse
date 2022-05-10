//fs (File Sistem) es un modulo incluido en Node para manicular archivos 
const fs = require('fs')
const data = fs.readFileSync('./test-input-sync.txt', 'utf-8')
console.log(data);

const contenido = `Esto es una prueba
Segunda Linea
`
fs.writeFileSync('./test-output-sync.txt', contenido)

const contenidoExtra = `Esto es un agregado
`
fs.appendFileSync('./test-output-sync.txt', contenidoExtra)

fs.unlinkSync('./test-output-sync.txt')
