const fs = require('fs')
let now = new Date()
try {
    fs.writeFileSync('./fyh.txt', now.toString())

    const archivo_fecha = fs.readFileSync('./fyh.txt', 'utf-8')
    console.log(archivo_fecha)  
} catch (error) {
    console.log(error)
}
