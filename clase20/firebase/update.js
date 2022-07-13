import query from "./db.js"

const id = 1
const doc = query.doc(`${id}`)

try {
    const writeResult = await doc.update({nombre: 'Alejandro', apellido: 'Gutierrez'})
    console.log({writeResult})
} catch (error) {
    console.log(`Error: ${error.message}`)
}