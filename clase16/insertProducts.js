const { options } = require('./db/mysql')
const knex = require('knex')(options)

const products = [
    { name: 'Coca Cola', price: 12.22, decription: 'Refresco de Cola', stock: 20, category_id: 1 },
    { name: 'Palomitas', price: 11, decription: 'Palomitas de mantequilla', stock: 9, category_id: 2 },
    { name: 'Agua mineral', price: 10.23, decription: '600 ml', stock: 15, category_id: 1 },
    { name: 'Arroz inflado', price: 18, decription: '200 gr', stock: 8, category_id: 3 },
    { name: 'Caramelos', price: 6, decription: 'Paquete de 6', stock: 21, category_id: 4 },
    { name: 'Chicles', price: 7.50, decription: 'Chicle Tipo Americano', stock: 12, category_id: 4 },
    { name: 'Mantecada', price: 14, decription: 'Paquete de 2', stock: 18, category_id: 5 },
    { name: 'Donas', price: 21, decription: 'Azucaradas', stock: 21, category_id: 5 },
]
   
knex('products')
    .insert(products)
    .then(() => console.log('Productos insertados'))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => knex.destroy())