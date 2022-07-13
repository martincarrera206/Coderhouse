import query from "./db.js"

/*
// En caso de hardcodear el ID
const id = 1
// Doc necesita que pases el id en forma de string
const doc = query.doc(`${id}`)

try {
    const user = await doc.set({ nombre: 'Martin', dni: 37665544})
    console.log({user})
} catch (error) {
    console.log(`Error: ${error.message}`)
}
*/

// En caso de generar IDs aleatoreos para el documento
try {
    const user = await query.add({ nombre: 'Pepe', dni: 48995566})
    console.log({user})
} catch (error) {
    console.log(`Error: ${error.message}`)
}