const newClientes = [
    { nombre : "Pablo", edad : 25 },
    { nombre : "Juan", edad : 22 },
    { nombre : "Lucia", edad : 25 },
    { nombre : "Juan", edad : 29 },
    { nombre : "Fede", edad : 35 }
]

// 1 
db.clientes.insertMany([
    { nombre : "Pablo", edad : 25 },
    { nombre : "Juan", edad : 22 },
    { nombre : "Lucia", edad : 25 },
    { nombre : "Juan", edad : 29 },
    { nombre : "Fede", edad : 35 }
])

// 2 
db.clientes.find({}).sort({edad: -1})

// 3
db.clientes.find({}).sort({edad: -1}).limit(1)

// 4 
db.clientes.find({}).sort({edad: -1}).skip(1).limit(1)

// 5
db.clientes.find({name: 'Juan'})

// 6 
db.clientes.find({name: 'Juan', edad: 29})

// 7 
db.clientes.find( {$or: [ {name: 'Juan'}, {name: 'Lucia'} ]} )

// 8 
db.clientes.find({ edad: {$gt : 25} })

// 9
db.clientes.find({ edad: {$lte : 25} })

// 10
db.clientes.find({ edad: {$ne : 25} })

// 11
db.clientes.find({ $and: [ {edad: {$gt : 26}}, {edad: {$lt : 35}} ] })

// 12
db.clientes.updateOne({nombre: 'Fede'}, {$set: {edad: 36}})
db.clientes.find({})

// 13
db.clientes.updateMany({edad: 25}, {$set: {edad: 26}})
db.clientes.find({})

// 14
db.clientes.remove({name: 'Juan'})
db.clientes.find({})

