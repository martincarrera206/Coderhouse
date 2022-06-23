const clientes = [
    {nombre: 'Julian Pirulo', edad: 24},
    {nombre: 'Hernan Cattaneo', edad: 35},
    {nombre: 'Loco Dice', edad: 36},
    {nombre: 'Anakin Skywalker', edad: 28}
]

const articulos = [
    {nombre: 'Pelota', precio: 150, stock:50},
    {nombre: 'Bate', precio: 249, stock:22},
    {nombre: 'Guante', precio: 75, stock:16},
    {nombre: 'Casco', precio: 87, stock:14}
]

// 3
db.clientes.insertOne({nombre: 'Julian Pirulo', edad: 24})

// 4
db.clientes.insertMany([
    {nombre: 'Hernan Cattaneo', edad: 35},
    {nombre: 'Loco Dice', edad: 36},
    {nombre: 'Anakin Skywalker', edad: 28}
])

// 5
db.articulos.insertMany([
    {nombre: 'Pelota', precio: 150, stock:50},
    {nombre: 'Bate', precio: 249, stock:22},
    {nombre: 'Guante', precio: 75, stock:16},
    {nombre: 'Casco', precio: 87, stock:14}
])

// 6
show collections

// 7
db.clientes.find()
db.articulos.find()

// 8
62ab313de1c40268ae9203d2
https://steveridout.com/mongo-object-time/

Year (XXXX)	
2022
Month (1 - 12)	
6
Date (1 - 31)	
16
Hours	
10
Minutes	
33
Seconds	
49
ISO Timestamp	
2022-06-16T13:33:49.000Z

// 9 
db.clientes.countDocuments()