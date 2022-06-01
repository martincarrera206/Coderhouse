const lista = [2,3,5,7]
lista.map(x => x*x).forEach(x => console.log(x))

// Los paquetes que instalamos se enceuntran dentro de la carpeta node_modules
// En el caso de babel usamos ./node_modules/.bin/babel ./origen.js -o ./destino.js
// Eso nos transpila el codigo de origen.js a un formato compatible para todos los navegadores, creando asi destino.js
// Se puede agregar un commando en package.json para facilitar la ejecuccion de comandos largos
// "build": "babel ./origen.js -o ./destino.js -w" (-w es para watch, si se modifica origen vuelve a transpilar y generar destino)

let a = ''
let b = 5

// Falsy
// https://developer.mozilla.org/en-US/docs/Glossary/Falsy
a ||= b 
console.log({ a })

// Truthy
// https://developer.mozilla.org/es/docs/Glossary/Truthy
a &&= b 
console.log({ a })

// Nulish
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
a ??= b
console.log({ a })

// Este es un codigo de "nueva generacion" permite asignar un valor siempre y cuando el objeto exista y tenga la variable desada
const name = user?.name
const name_ = user && user.name


// Node permite cambiar de versiones usando el comando nvm
// Babel tiene un transpilador online en su pagina https://babeljs.io/