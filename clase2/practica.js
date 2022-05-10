
function suma(a, b){
    return a + b;
}

//Para usar la funcion
const result = suma(2, 3);
console.log(result);

//Esto es igual a hacerlo directo en el log
console.log(suma(2,3));

//Definir una funcion como variable con el mismo fin
const sum = function(a,b){
    return a+b;
}
console.log(sum(2,3));


//funcion IIFE: simula que es una variable al encerrarse en ()
// A nivel practico se utilizan para limitar scopes de ciertas varaibles
// 
(function(nombre) {
    console.log("Hola "+ nombre);
})("Ivan");