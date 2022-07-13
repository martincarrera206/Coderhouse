import query from "./db.js"
import parseUser from "./utils/parseUser.js"

try {
    const docs = await query.get()
    // const docs = await query.select('nombre').get()
    /*
    const users = docs.docs.map(doc => {
        // ...doc.data() => Con los ... destruye el objeto y lo integra al nuevo obj
        /*
        Resultado de {id:doc.id, ...doc.data() }
        users: [
            { id: '1', nombre: 'Martin', dni: 37665544 },
            { id: 'ozLtt9EtwpPUmjMlkBrD', dni: 48995566, nombre: 'Pepe' }
        ]
        *
        return {id:doc.id, ...doc.data() }
    })
    */
    const users =  docs.docs.map(parseUser)
    console.log({users})
} catch (error) {
    console.log(`Error: ${error.message}`)
}