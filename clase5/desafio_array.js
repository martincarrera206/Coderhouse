const productos = [
    {id: 1, nombre: 'Escuadra', precio:323.45},
    {id: 2, nombre: 'Calculadora', precio:234.54},
    {id: 3, nombre: 'Globo Terraqueo', precio:45.67},
    {id: 4, nombre: 'Paleta Pintura', precio:456.78},
    {id: 5, nombre: 'Reloj', precio:67.89},
    {id: 6, nombre: 'Agenda', precio:78.90}
]
/*
//Usando for 
let resultado = {}
for (let index = 0; index < productos.length; index++) {
    const producto = productos[index];
    resultado.a = index == 0 ? producto.nombre : resultado.a+','+producto.nombre
    resultado.b = index == 0 ? producto.precio : resultado.b+producto.precio
    if(index == (productos.length-1)) resultado.c = resultado.b / productos.length
    if(index == 0 || (resultado.d !== undefined && producto.precio < resultado.d) ) resultado.d = producto.precio 
    if(index == 0 || (resultado.e !== undefined && producto.precio > resultado.e) ) resultado.e = producto.precio 
}

*/
//Usando las funciones de array
let resultado = {}
resultado.a = productos.map((producto) => {
    return producto.nombre
}).join(',')
resultado.b = Math.round(productos.reduce((acc, val) => {
    return acc + val.precio
}, 0) )
resultado.c = resultado.b / productos.length
resultado.d = productos.reduce((a, e ) => e.precio < a.precio ? e : a)
resultado.e = productos.reduce((a, e ) => e.precio > a.precio ? e : a)

//Muestro resultados
console.log({productos})
console.log({resultado})