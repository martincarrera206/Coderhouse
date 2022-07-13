import fs  from "fs";

export default class Product{
    static nombre_archivo: string = './src/data/products.json'
    
    private id?: number
    private timestamp?: number

    private nombre: string
    private descripcion: string
    private codigo: string
    private precio: number
    private foto: string
    private stock: number

    constructor(nombre: string, descripcion:string, codigo:string, precio: number, foto: string, stock:number, id?:number, timestamp?:number){
        this.nombre = nombre
        this.precio = precio
        this.foto = foto
        this.stock = stock
        this.descripcion = descripcion
        this.codigo = codigo
        if(id) this.id = id
        if(timestamp) this.timestamp = timestamp
    }

    // ------- GETERS -------

    getId():number|undefined{
        return this.id
    }
    getTimestamp():number|undefined{
        return this.timestamp
    }

    getNombre():string{
        return this.nombre
    }
    getDescripcion():string{
        return this.descripcion
    }
    getCodgio():string{
        return this.codigo
    }
    getPrecio():number{
        return this.precio
    }
    getFoto():string{
        return this.foto
    }
    getStock():number{
        return this.stock
    }

    // ------- SETERS -------

    setNombre(nombre:string):void{
        this.nombre = nombre
    }
    setDescripcion(descripcion:string):void{
        this.descripcion = descripcion
    }
    setCodigo(codigo:string):void{
        this.codigo = codigo
    }
    setPrecio(precio:number):void{
        this.stock = precio
    }
    setFoto(foto:string):void{
        this.foto = foto
    }
    setStock(stock:number):void{
        this.stock = stock
    }
    setId(id:number):void{
        this.id = id
    }
    setTimestamp(timestamp:number):void{
        this.timestamp = timestamp
    }
    // ------- FUNCIONES CRUD -------

    async save():Promise<Product>{
        let ar_objetos = await Product.getAll()
        
        const ultimo_obj = (ar_objetos != undefined && ar_objetos.length >= 1 ? ar_objetos[ar_objetos.length - 1] : undefined)
        this.id = (ultimo_obj != undefined && ultimo_obj.id !== undefined ? ultimo_obj.id + 1 : 1)
        this.timestamp = Date.now()
        ar_objetos.push(this)

        fs.promises.writeFile(Product.nombre_archivo, JSON.stringify( ar_objetos, null, 2 ))
        .catch((errorSave:Error) => {
            console.log({errorSave})
        })
        return this
    }

    async update():Promise<void>{
        Product.getAll()
        .then((ar_objetos:Array<Product>) => {
            let new_ar_objetos:Array<Product> = []
            for (let index:number = 0; index < ar_objetos.length; index++) {
                const obj:Product = ar_objetos[index]
                if(obj.getId() == this.getId()){
                    ar_objetos[index].setNombre(this.getNombre())
                    ar_objetos[index].setDescripcion(this.getDescripcion())
                    ar_objetos[index].setCodigo(this.getCodgio())
                    ar_objetos[index].setPrecio(this.getPrecio())
                    ar_objetos[index].setFoto(this.getFoto())
                    ar_objetos[index].setStock(this.getStock())
                }
                new_ar_objetos.push(ar_objetos[index])
                fs.promises.writeFile(Product.nombre_archivo, JSON.stringify( new_ar_objetos, null, 2 ))
                .catch((errorUpdate:Error) => {
                    console.log({errorUpdate})
                })
            }}
        )        
    }

    static async getById(obj_id: number):Promise<Product|undefined>{
        const product = await Product.getAll()
        .then((ar_objetos) => {
            //Probamos usando el find()
            const obj_deseado:Product|undefined = ar_objetos.find((element:Product) => {
                return element.id == obj_id
            })
            return (obj_deseado != undefined && obj_deseado.id != undefined ? obj_deseado : undefined)
        })
        return product ? product : undefined
    }

    static async getAll():Promise<Array<Product>>{
        const products = await fs.promises.readFile(Product.nombre_archivo, 'utf-8')
        .then((data:string) => {
            if(data === "" || data == undefined) return []
            else{ 
                let ar_objects:Array<Product> = []
                const dataParsed:Array<any> = JSON.parse(data)
                if(dataParsed){
                    for (let index:number = 0; index < dataParsed.length; index++) {
                        const jsonElement = dataParsed[index]
                        const product:Product = new Product(
                            jsonElement.nombre,
                            jsonElement.descripcion,
                            jsonElement.codigo,
                            jsonElement.precio,
                            jsonElement.foto,
                            jsonElement.stock,
                            jsonElement.id,
                            jsonElement.timestamp
                        )
                        ar_objects.push(product)
                    }
                }
                return ar_objects
            }
        })
        .catch((errorGetAll:Error) => {
            console.log({errorGetAll})
        })
        return products ? products : []
    }

    static async deleteById(obj_id:number):Promise<void>{
        const ar_objetos = await Product.getAll()

        const new_ar_objetos: Array<Product> = []
        for (let index = 0; index < ar_objetos.length; index++) {
            const obj = ar_objetos[index]
            if(obj.id !== obj_id) new_ar_objetos.push(ar_objetos[index]) 
        }

        fs.promises.writeFile(Product.nombre_archivo, JSON.stringify( new_ar_objetos, null, 2 ))
        .catch((errorDeleteAll:Error) => {
            console.log({errorDeleteAll})
        })
    }

    static async deleteAll():Promise<void>{
        fs.promises.writeFile(Product.nombre_archivo, '', 'utf-8')
        .catch((errorDeleteAll:Error) => {
            console.log({errorDeleteAll})
        })
    }

}
