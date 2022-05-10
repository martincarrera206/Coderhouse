function mostrarLista(ar_lista){
    if(ar_lista.length > 0){
        for (let index = 0; index < ar_lista.length; index++) {
            const element = ar_lista[index];
            console.log(element);
        }
    }else{
        console.log("lista vacia");
    }
}

const una_lista = [
    10,
    20,
    30
];
console.log("Punto 1:");
mostrarLista(una_lista);
console.log("---------");

console.log("Punto 2:");
(function(ar_lista){
    if(ar_lista.length > 0){
        for (let index = 0; index < ar_lista.length; index++) {
            const element = ar_lista[index];
            console.log(element);
        }
    }else{
        console.log("lista vacia");
    }
})([12, 22, 32]);
console.log("---------");

function crearMultiplicador(num1, num2){
    return function(num2){
        return num1 * num2;
    }
}
console.log("Punto 3a:");
console.log(crearMultiplicador(6)(10));
console.log("---------");

function duplicar(duplicate_number){
    return crearMultiplicador(duplicate_number)(2);
}
function triplicar(triplicate_number){
    return crearMultiplicador(triplicate_number)(3);
}

console.log("Punto 3b:");
console.log(duplicar(6));
console.log("---------");

console.log("Punto 3c:");
console.log(triplicar(6));
console.log("---------");