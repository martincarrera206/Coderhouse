class Producto{
    static ar_objetos = [
        {
            "title": "Bate de Beisbol",
            "price": 1200,
            "thumbnail": "https://media.istockphoto.com/photos/baseball-bat-picture-id171210918?k=20&m=171210918&s=612x612&w=0&h=n2dm77j-wBe5nML4UFI9Y0gyK2XwthMdlLYWwbfbRHw=",
            "id": 1
        },
        {
            "title": "Bicileta",
            "price": 6450,
            "thumbnail": "https://images-na.ssl-images-amazon.com/images/I/61SpjnjBTQL._AC_UL604_SR604,400_.jpg",
            "id": 2
        }
    ]

    constructor(title, price, thumbnail){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    static create(_obj){
        let data = this.getAll()
        const ar_objetos = (data !== '' && data[0] !== undefined ? data : [])
        const ultimo_obj = ar_objetos[ar_objetos.length - 1]
        _obj.id = (ultimo_obj != undefined && ultimo_obj.id !== undefined ? ultimo_obj.id + 1 : 1)
        ar_objetos.push(_obj)
        return _obj
    }

    static update(_obj){
        const ar_objetos = this.getAll()
        let encontrado = false
        for (let index = 0; index < ar_objetos.length; index++) {
            if(ar_objetos[index].id == _obj.id){
                encontrado = true
                ar_objetos[index].title = _obj.title
                ar_objetos[index].price = _obj.price
                ar_objetos[index].thumbnail = _obj.thumbnail
            } 
        }
        Producto.ar_objetos = ar_objetos
        return encontrado
    }

    static getById(obj_id){
        try {
            const ar_objetos = this.getAll()
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

    static getAll(){
        return Producto.ar_objetos;
    }

    static deleteById(obj_id){
        const ar_objetos = this.getAll()
        const new_ar_objetos = []
        let encontrado = false
        for (let index = 0; index < ar_objetos.length; index++) {
            const obj = ar_objetos[index];
            if(obj.id !== obj_id){
                new_ar_objetos.push(ar_objetos[index]) 
            }else{
                encontrado = true
            }
        }
        Producto.ar_objetos = new_ar_objetos
        return encontrado
    }

    static deleteAll(){
        Producto.ar_objetos = []
    }

}

module.exports = Producto
