"use strict";

var _a, _user;

var lista = [2, 3, 5, 7];
lista.map(function (x) {
  return x * x;
}).forEach(function (x) {
  return console.log(x);
}); // Los paquetes que instalamos se enceuntran dentro de la carpeta node_modules
// En el caso de babel usamos ./node_modules/.bin/babel ./origen.js -o ./destino.js
// Eso nos transpila el codigo de origen.js a un formato compatible para todos los navegadores, creando asi destino.js
// Se puede agregar un commando en package.json para facilitar la ejecuccion de comandos largos
// "build": "babel ./origen.js -o ./destino.js -w" (-w es para watch, si se modifica origen vuelve a transpilar y generar destino)

var a = '';
var b = 5; // Falsy
// https://developer.mozilla.org/en-US/docs/Glossary/Falsy

a || (a = b);
console.log({
  a: a
}); // Truthy
// https://developer.mozilla.org/es/docs/Glossary/Truthy

a && (a = b);
console.log({
  a: a
}); // Nulish
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator

(_a = a) !== null && _a !== void 0 ? _a : a = b;
console.log({
  a: a
}); // Este es un codigo de "nueva generacion" permite asignar un valor siempre y cuando el objeto exista y tenga la variable desada

var name = (_user = user) === null || _user === void 0 ? void 0 : _user.name;
var name_ = user && user.name; // Node permite cambiar de versiones usando el comando nvm
