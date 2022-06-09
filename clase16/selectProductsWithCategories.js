const { options } = require('./db/mysql')
const knex = require('knex')(options)

knex.from('products')
    .select('products.*', 'categories.name as category_name')
    .join('categories', {'products.category_id': 'categories.id'})
    .then(products => {
        console.log(`Total de productos: ${products.length}`)
        //console.log({products})
        products.forEach(product => {
            console.log(`Producto: ${product.name} con precio de $${product.price}, stock de ${product.stock} y categoria ${product.category_name}`)
        })
    })
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => knex.destroy())