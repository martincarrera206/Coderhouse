import query from "./db.js"

const id = 'ozLtt9EtwpPUmjMlkBrD'
const doc = query.doc(`${id}`)

try {
    const writeResult = await doc.delete()
    console.log({writeResult})
} catch (error) {
    console.log(`Error: ${error.message}`)
}