import query from "./db.js"
import parseUser from "./utils/parseUser.js"

try {
    const id = 1
    const doc = query.doc(`${id}`)
    const response = await doc.get()
    //const user = {id: response.id, ...response.data()}
    const user = parseUser(response)

    console.log({user})
} catch (error) {
    console.log(`Error: ${error.message}`)
}