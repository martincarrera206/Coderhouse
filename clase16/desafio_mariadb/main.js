const {options} = require('./db/mysql')
const knex = require('knex')(options)

knex
    .schema
    .dropTableIfExists('articulos')
    .then(() => {
        /*
        Debe crear una tabla llamada articulos con la siguiente estructura:
        Campos: 
            - nombre tipo varchar 15 caracteres no nulo
            - codigo tipo varchar 10 caracteres no nulo
            - precio tipo float
            - stock tipo entero
            - id clave primaria autoincremental no nula
        */
        return knex
            .schema
            .createTable('articulos', (table) => {
                table.increments('id')
                table.string('nombre', 15)
                table.string('codigo', 10)
                table.float('precio')
                table.integer('stock')
            })
    })
    .then(() => {
        console.log('Tabla de articulos creada')

        // Insertar 5 articulos en esa tabla, con datos de prueba con stocks positivos 
        const articulos = [
            { nombre: 'Coca Cola', precio: 12.22, codigo: 'Refresco de Cola', stock: 20},
            { nombre: 'Palomitas', precio: 11, codigo: 'Palomitas de mantequilla', stock: 9},
            { nombre: 'Agua mineral', precio: 10.23, codigo: '600 ml', stock: 15},
            { nombre: 'Arroz inflado', precio: 18, codigo: '200 gr', stock: 8},
            { nombre: 'Caramelos', precio: 6, codigo: 'Paquete de 6', stock: 21}
        ]

        return knex('articulos')
            .insert(articulos)
    })
    .then(() => {
        console.log('Articulos Insertados')

        // Listar la tabla mostrando los resultados en la consola
        return knex.from('articulos')
        .select('*')
        .then(articulos => {
            console.log(`Total de productos: ${articulos.length}`)
            articulos.forEach(articulo => {
                console.log({articulo})
            })
        })
    })
    .then(() => {
        console.log('Articulos Mostrados')

        // Borrar el articulo con id = 3
        return knex.from('articulos')
        .where('id', 3)
        .del()
    })
    .then(() => {
        console.log('Articulos Mostrados')

        // ctualizar el stock a 0 del articulo con id = 2
        return knex.from('articulos')
        .where('id', 2)
        .update({ stock: 0 })
    })
    .then(() => {
        console.log('Articulos Mostrados')

        // Muestro Resultado
        return knex.from('articulos')
        .select('*')
        .then(articulos => {
            console.log(`Tabla Resultante:`)
            articulos.forEach(articulo => {
                console.log({articulo})
            })
        })
    })
    .catch((error) => {console.log({errorKnex : error})})
    .finally(() => knex.destroy())