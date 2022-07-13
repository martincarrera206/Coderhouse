import suma from './suma.js'

console.log('========= Test 1 ===========')
const expected1 = 8
const result1 = suma(3, 5)

if(expected1 === result1){
    console.log(`Test 1 exitoso`)
}else{
    throw new Error(`Test 1 fallido`)
}

console.log('========= Test 2 ===========')
const expected2 = 'Faltan parametros'
const result12 = suma(3)

if(result12 instanceof Error && expected2 === result12.message){
    console.log(`Test 2 exitoso`)
}else{
    throw new Error(`Test 2 fallido`)
}

console.log('========= Test 3 ===========')
const expected3 = 'No se recibieron los tipos de datos correctos'
const result13 = suma('uno', '2')

if(result13 instanceof Error && expected3 === result13.message){
    console.log(`Test 3 exitoso`)
}else{
    throw new Error(`Test 3 fallido`)
}