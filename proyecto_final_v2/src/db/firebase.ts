import admin from 'firebase-admin'
import { readFile } from 'fs/promises'
const fileResult : any = readFile(
    new URL('./src/db/firebase-key.json', import.meta.url)
)

const serviceAccount = JSON.parse(fileResult)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://coder-30965.firebaseio.com'
})

const db = admin.firestore()
const query = db.collection('users')

export default query