// Datos que se pueden extraer del proceso
console.log(`
Directio actual: ${process.cwd()}
Id del proces: ${process.pid}
Versión de node: ${process.version}
Titulo del proceso: ${process.title}
Sistema operativo: ${process.platform},
Uso de la memoria: ${JSON.stringify(process.memoryUsage(), null, 2)}
`)

//Se puede adjuntar funciones a eventos del proceso
// beforeExit se ejecuta antes de que termine "naturalmente" el proceso
process.on('beforeExit', (code) => {
    console.log(`Proceso va a finalizar con código de salida: ${code}`)
})   
// exit se ejecuta al momento de finalizar (no se puede prevenir el exit a este punto)
process.on('exit', (code) => {
    console.log(`Proceso finalizado con código de salida: ${code}`)
})
// Podemos cachear un error a nivel global, procesarlo de alguna forma y volverlo a disparar
process.on('uncaughtException', (err) => {
    console.log(`Excepcion catcheada: ${err.message}`)
    throw err
})

// EJ 1 de como terminar el proceso por completo
const version = Number(process.version.substring(0, 3).replace('v', ''))
if(version < 16 ){
    console.log('Necesitas actualizar la version de NodeJS')
    // Se le puede pasar codigos de exit para indicar distintos "estados"
    process.exit(1) 
}
console.log(version, typeof version)

// EJ 2 de como terminar el proceso por completo
/*
for (let index = 0; index < 10000; index++) {
    console.log(index)
    if(index == 99){
        process.exit()
    }
}
*/