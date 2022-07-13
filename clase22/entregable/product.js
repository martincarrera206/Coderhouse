class Producto{
    static knex

    constructor(title, price, thumbnail, id = null){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
        if(id) this.id = id
    }

    static create(_obj){
        return Producto.knex.from('products')
            .insert([_obj])
            .then((prod_ids) => {return prod_ids[0]})
            .catch(err => console.log(`Error: ${err.message}`))
    }

    static update(_obj){
        return Producto.knex.from('products')
            .where('id', _obj.id)
            .update({ title: _obj.title, price: _obj.price, thumbnail: _obj.thumbnail})
            .then(products => {
                console.log(`Productos actualizados: ${products}`)
                if(products) return true
                else return false
            })
            .catch(err => console.log(`Error: ${err.message}`))
    }

    static getById(obj_id){
        return Producto.knex.from('products')
            .where('id', obj_id)
            .then(products => {
                if(products)
                    return new Producto(product[0].title, product[0].price, product[0].thumbnail, product[0].id)
                else return false
            })
            .catch(err => console.log(`Error: ${err.message}`))
    }

    static getAll(){
        return Producto.knex.from('products')
        .select('*')
        .then(products => {
            let ar_objetos = []
            if(products.length > 0){
                console.log(`Total de productos: ${products.length}`)
                products.forEach(product => {
                    const prod = new Producto(product.title, product.price, product.thumbnail, product.id)
                    ar_objetos.push(prod)
                })
            }
            return ar_objetos
        })
        .catch(err => console.log(`Error: ${err.message}`))
    }

    static deleteById(obj_id){
        return Producto.knex.from('products')
            .where('id', obj_id)
            .del()
            .then(products => {
                console.log(`Productos eliminados: ${products}`)
                if(products) return true
                else return false
            })
            .catch(err => console.log(`Error: ${err.message}`))
    }

    static deleteAll(){
        return Producto.knex.from('products')
        .del()
        .then(products => {
            console.log(`Productos eliminados: ${products}`)
            if(products) return true
            else return false
        })
        .catch(err => console.log(`Error: ${err.message}`))
    }

}

module.exports = Producto
