const { db } = require("../clase19/models/user")

const productos = [
    {
        title : 'Basketball',
        price : 120,
        thumbnail : 'https://cdn0.iconfinder.com/data/icons/sports-59/512/Basketball-128.png',
        stock: 500,
        codigo: 'BB150'
    },
    {
        title : 'Pelota de Footbol',
        price : 580,
        thumbnail : 'https://cdn1.iconfinder.com/data/icons/UrbanStories-png-Artdesigner-lv/256/Bicycle_by_Artdesigner.lv.png',
        stock: 300,
        codigo: 'PF580'
    },
    {
        title : 'Casco de Vikingo',
        price : 900,
        thumbnail : 'https://cdn1.iconfinder.com/data/icons/photo-stickers-hats/128/hat_4-128.png',
        stock: 38,
        codigo: 'CV900'
    },
    {
        title : 'Zapatillas Mike',
        price : 1280,
        thumbnail : 'https://cdn1.iconfinder.com/data/icons/cool-shoes/200/ziyuan_19-512.png',
        stock: 422,
        codigo: 'ZM99'
    },
    {
        title : 'Red de Ping Pong',
        price : 1700,
        thumbnail : 'https://cdn1.iconfinder.com/data/icons/customicondesign-office-shadow/256/Sport-table-tennis.png',
        stock: 800,
        codigo: 'RDPP'
    },
    {
        title : 'Botines Deportivos Mike',
        price : 2300,
        thumbnail : 'https://cdn1.iconfinder.com/data/icons/cool-shoes/200/ziyuan_19-512.png',
        stock: 270,
        codigo: 'BDM'
    },
    {
        title : 'Raqueta de Tennis Professional',
        price : 2860,
        thumbnail : 'https://cdn1.iconfinder.com/data/icons/customicondesign-office-shadow/256/Sport-table-tennis.png',
        stock: 63,
        codigo: 'RTP'
    },
    {
        title : 'Combo Ping Pong (2 paletas + pelota)',
        price : 3350,
        thumbnail : 'https://cdn1.iconfinder.com/data/icons/customicondesign-office-shadow/256/Sport-table-tennis.png',
        stock: 480,
        codigo: 'CPP'
    },
    {
        title : 'Mesa de Ping Pong',
        price : 4320,
        thumbnail : 'https://cdn1.iconfinder.com/data/icons/customicondesign-office-shadow/256/Sport-table-tennis.png',
        stock: 10,
        codigo: 'MPP'
    },
    {
        title : 'Pelota de Baseball Firmada por Babe Ruth',
        price : 4990,
        thumbnail : 'https://cdn1.iconfinder.com/data/icons/customicondesign-office-shadow/256/Sport-table-tennis.png',
        stock: 1,
        codigo: 'BBFBR'
    }
]

const mensajes = [
    {
        text: 'Este es el primer mensaje',
        time: 1655948393,
        user_id: 1
    },
    {
        text: 'Este es el segundo mensaje',
        time: 1655948459,
        user_id: 2
    },
    {
        text: 'Este es el tercer mensaje',
        time: 1655959193,
        user_id: 3
    },
    {
        text: 'Este es el cuarto mensaje',
        time: 1655962793,
        user_id: 2
    },
    {
        text: 'Este es el quinto mensaje',
        time: 1655963793,
        user_id: 1
    },
    {
        text: 'Este es el sexto mensaje',
        time: 1655964793,
        user_id: 5
    },
    {
        text: 'Este es el septimo mensaje',
        time: 1655965793,
        user_id: 4
    },
    {
        text: 'Este es el octavo mensaje',
        time: 1655966793,
        user_id: 5
    },
    {
        text: 'Este es el noveno mensaje',
        time: 1655967793,
        user_id: 1
    },
    {
        text: 'Este es el decimo mensaje',
        time: 1655968793,
        user_id: 6
    }
]
// Previo
use ecommerce

// 1 & 2
db.productos.insertMany(productos)
db.mensajes.insertMany(mensajes)

// 3
db.productos.find()
db.mensajes.find()

// 4
db.productos.estimatedDocumentCount()
db.mensajes.estimatedDocumentCount()

// 5.A
db.productos.insertOne({ title : 'Guante de practica', price : 670, thumbnail : 'https://cdn1.iconfinder.com/data/icons/customicondesign-office-shadow/256/Sport-table-tennis.png', stock: 999,  codigo: 'GDP' })

// 5.B
db.productos.find({title: 'Mesa de Ping Pong'})

// 5.B.I
db.productos.find({$and:[
    {title: 'Mesa de Ping Pong'},
    {price: {$lt: 1000}}
]})

// 5.B.II
db.productos.find({$and:[
    {title: 'Mesa de Ping Pong'},
    {price: {$gt: 1000}},
    {price: {$lt: 3000}},
]})

// 5.B.III
db.productos.find({$and:[
    {title: 'Mesa de Ping Pong'},
    {price: {$gt: 3000}}
]})

// 5.B.IV
db.productos.find({title: 'Mesa de Ping Pong'}).sort({price: 1}).skip(2).limit(1)

// 5.C
db.productos.update({}, {$set: {stock: 100}})

// 5.D
db.productos.update({price: {$gt: 4000}}, {$set: {stock: 0}})

// 5.E
db.productos.deleteMany({price: {$lt: 1000}})

// 6
// Para crear a pepe
use admin
db.createUser({user: "pepe", pwd: "asd456", roles: [{ role: "read", db: "ecommerce" }]})

// Para conectarme como pepe
mongosh -u pepe -p asd456 --authenticationDatabase ecommerce

// Para probar privilegios
show dbs
use ecommerce
db.productos.deleteMany({price: {$lt: 1000}})

// tira error => Funciono bien :)



