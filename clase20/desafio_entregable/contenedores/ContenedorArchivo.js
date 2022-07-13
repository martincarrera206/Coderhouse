const fs = require('fs');

class ContenedorArchivo{
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

module.exports = ContenedorArchivo