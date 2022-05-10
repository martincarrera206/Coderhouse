const fs = require('fs');

class Contenedor{
    constructor(nombre_archivo){
        this.nombre_archivo = nombre_archivo
    }

    async save(obj){
        let data = await this.getAll()
        const ar_objetos = (data !== '' && data[0] !== undefined ? data : [])
        const ultimo_obj = ar_objetos[ar_objetos.length - 1]
        obj.id = (ultimo_obj != undefined && ultimo_obj.id !== undefined ? ultimo_obj.id + 1 : 1)
        ar_objetos.push(obj)
        await fs.promises.writeFile(this.nombre_archivo, JSON.stringify( ar_objetos, null, 2 ))
        .catch(errorSave => {
            console.log({errorSave})
        })
        return obj.id
    }

    async getById(obj_id){
        try {
            const ar_objetos = await this.getAll()
            //Probamos usando el find()
            const obj_deseado = ar_objetos.find((element) => {
                return element.id == obj_id
            })
            return (obj_deseado != undefined && obj_deseado.id != undefined ? obj_deseado : null)
        } catch (errorGetById) {
            console.log({errorGetById})
            return null
        }
    }

    async getAll(){
        const ar_objects = await fs.promises.readFile(this.nombre_archivo, 'utf-8')
        .then(data => {
            if(data === "" || data == undefined) return []
            else return JSON.parse(data)
        })
        .catch(errorGetAll => {
            console.log({errorGetAll})
        })
        return ar_objects
    }

    async deleteById(obj_id){
        const ar_objetos = await this.getAll()
        const new_ar_objetos = []
        for (let index = 0; index < ar_objetos.length; index++) {
            const obj = ar_objetos[index];
            if(obj.id !== obj_id) new_ar_objetos.push(ar_objetos[index]) 
        }
        await fs.promises.writeFile(this.nombre_archivo, JSON.stringify( new_ar_objetos, null, 2 ))
        .catch(errorDeleteAll => {
            console.log({errorDeleteAll})
        })
    }

    async deleteAll(){
        await fs.promises.writeFile(this.nombre_archivo, '', 'utf-8')
        .catch(errorDeleteAll => {
            console.log({errorDeleteAll})
        })
    }

}

//Pruebas
let contenedorProductos = new Contenedor('./productos.txt')

const producto1 = {
    title: 'Pelota de Futbol',
    price: 250.00,
    thumbnail: 'https://i.pinimg.com/736x/b6/12/c6/b612c6319713e9d4cdb4f8565002a5ec--soccer-ball-pictures-of.jpg'
}
const producto2 = {
    title: 'Bate de Beisbol',
    price: 1200.00,
    thumbnail: 'https://media.istockphoto.com/photos/baseball-bat-picture-id171210918?k=20&m=171210918&s=612x612&w=0&h=n2dm77j-wBe5nML4UFI9Y0gyK2XwthMdlLYWwbfbRHw='
}
const producto3 = {
    title: 'Bicileta',
    price: 6450.00,
    thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/61SpjnjBTQL._AC_UL604_SR604,400_.jpg'
}

;(async () => {
    try {
        //console.log({producto1})
        const producto1_id = await contenedorProductos.save(producto1)
        const producto2_id = await contenedorProductos.save(producto2)
        const producto3_id = await contenedorProductos.save(producto3)
        console.log({producto1_id})
        console.log({producto2_id})
        console.log({producto3_id})

        const producto_get_by_id = await contenedorProductos.getById(producto1_id)
        console.log({producto_get_by_id})

        const all_productos = await contenedorProductos.getAll()
        console.log({all_productos})

        console.log({producto_a_eliminar : producto1_id})
        await contenedorProductos.deleteById(producto1_id)
        const resultado_de_eliminar_id = await contenedorProductos.getAll()
        console.log({resultado_de_eliminar_id})
        /*
        await contenedorProductos.deleteAll()
        const resultado_de_eliminar_all = await contenedorProductos.getAll()
        console.log({resultado_de_eliminar_all})
        */
    } catch (error) {
        console.log(error)
    }
})()
