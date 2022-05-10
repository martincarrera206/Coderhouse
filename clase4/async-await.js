function dividir(dividendo, divisor){
    return new Promise((resolve, reject) =>{
        if(divisor == 0){
            reject('No se puede dividir por cero')
        }else{
            resolve(dividendo/divisor)
        }
    })
}
//Utlizamos una IFFI (funciona anonima que se ejecuta ni bien se declara) para no utilizar variables de uso unico
;(async () => {
    try {
        //el await solo esta disponible dentro de un async function
        //Si genera un error debemos usar el try catch para levantar la funcion reject de la promesa
        const resultado = await dividir(10, 0)
        console.log(resultado)
    } catch (error) {
        console.log(error)
    }
})()

//Lo anterior se puede usar varaibles de uso unico (pero no es recomendado)
/*
const init = async () => {
    try {
        //el await solo esta disponible dentro de un async function
        //Si genera un error debemos usar el try catch para levantar la funcion reject de la promesa
        const resultado = await dividir(10, 0)
        console.log(resultado)
    } catch (error) {
        console.log(error)
    }
}

init()
*/