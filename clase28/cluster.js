const cluster = require('cluster')
const http = require('http')

const numCPUs = require('os').cpus().length

//console.log({cluster})
//console.log({numCPUs})

// El cluster tiene isPrimary para indicar si es el hilo principal
if(cluster.isPrimary){
    console.log(`Proceso Primario: ${process.pid}`)

    for (let index = 0; index < numCPUs; index++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) =>{
        console.log(`worker ${worker.process.pid} died`)
    })

}else{
    console.log(`Proceso secundario: ${process.pid}`)
    const PORT = process.argv[2] || 8080

    http.createServer((req, res) => {
        res.writeHead(200)
        res.end(`Process: ${process.pid}`)
    }).listen(PORT)
}
