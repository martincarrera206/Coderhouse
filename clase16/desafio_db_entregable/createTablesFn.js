const createTablesFn = (knex_mysql, knex_sqlite) => {
    knex_mysql.schema
        .hasTable('products').then(function(exists) {
            if (!exists) {
                return knex_mysql.schema.createTable('products', (table) => {
                    table.increments('id')
                    table.string('title', 30)
                    table.float('price')
                    table.text('thumbnail')
                    table.string('description', 255)
                    table.integer('stock')
                })
            }
        })
        .then(() => {
            console.log('Tabla de productos creada')
        })
        .catch((error) => {console.log({errorKnex : error})})

    knex_sqlite.schema
        .hasTable('messages').then(function(exists) {
            if (!exists) {
                return knex_sqlite.schema.createTable('messages', (table) => {
                    table.increments('id')
                    table.text('text')
                    table.timestamp('time').defaultTo(knex_sqlite.fn.now())
                    table.integer('user_id')
                })
            }
        })
        .then(() => {
            console.log('Tabla de mensajes creada')
        })
        .catch((error) => {console.log({errorKnex : error})})
}

module.exports = createTablesFn