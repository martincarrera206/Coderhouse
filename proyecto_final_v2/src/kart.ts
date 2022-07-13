import Product from "./product";
import fs  from "fs";

export default class Kart{
    static nombre_archivo: string = './src/data/karts.json'
    
    private id?: number
    private timestamp?: number

    private products: Array<Product>

    constructor(id?:number, timestamp?:number, products?:Array<Product>){
        this.products = []
        if(id) this.id = id
        if(timestamp) this.timestamp = timestamp
        if(products) this.products = products
    }

    // ------- GETERS -------

    getId():number|undefined{
        return this.id
    }
    getTimestamp():number|undefined{
        return this.timestamp
    }
    getProducts():Array<Product>{
        return this.products
    }

    // ------- SETERS -------

    setProducts(products:Array<Product>):void{
        this.products = products
    }

    // ------- FUNCIONES Array Products -------

    async addProduct(product:Product):Promise<void>{
        const ultimo_product = (this.products != undefined && this.products.length >= 1 ? this.products[this.products.length - 1] : undefined)
        
        const next_id = (ultimo_product != undefined && ultimo_product.getId() !== undefined ? Number( ultimo_product.getId() ) + 1 : 1)
        const dtNow = Date.now()

        product.setId(next_id)
        product.setTimestamp(dtNow)

        this.products.push(product)
        this.update()
    }

    async updateProduct(product:Product):Promise<void>{
        for (let index:number = 0; index < this.products.length; index++) {
            const _product:Product = this.products[index]
            if(_product.getId() == product.getId()){
                this.products[index].setNombre(product.getNombre())
                this.products[index].setDescripcion(product.getDescripcion())
                this.products[index].setCodigo(product.getCodgio())
                this.products[index].setPrecio(product.getPrecio())
                this.products[index].setFoto(product.getFoto())
                this.products[index].setStock(product.getStock())
            }
        }
        this.update()
    }

    async deleteProduct(product_id:number):Promise<void>{
        this.products = this.products.filter((product:Product, index:number, arr:Array<Product>) => {
            return product.getId() !== product_id
        })
        this.update()
    }

    // ------- FUNCIONES CRUD -------

    async save():Promise<Kart>{
        let ar_objetos = await Kart.getAll()
        
        const ultimo_obj = (ar_objetos != undefined && ar_objetos.length >= 1 ? ar_objetos[ar_objetos.length - 1] : undefined)
        this.id = (ultimo_obj != undefined && ultimo_obj.id !== undefined ? ultimo_obj.id + 1 : 1)
        this.timestamp = Date.now()
        ar_objetos.push(this)

        fs.promises.writeFile(Kart.nombre_archivo, JSON.stringify( ar_objetos, null, 2 ))
        .catch((errorSave:Error) => {
            console.log({errorSave})
        })
        return this
    }

    async update():Promise<void>{
        Kart.getAll()
        .then((ar_objetos:Array<Kart>) => {
            let new_ar_objetos:Array<Kart> = []
            for (let index:number = 0; index < ar_objetos.length; index++) {
                const obj:Kart = ar_objetos[index]
                if(obj.getId() == this.getId()){
                    ar_objetos[index].setProducts(this.getProducts())
                }
                new_ar_objetos.push(ar_objetos[index])
                fs.promises.writeFile(Kart.nombre_archivo, JSON.stringify( new_ar_objetos, null, 2 ))
                .catch((errorUpdate:Error) => {
                    console.log({errorUpdate})
                })
            }}
        ) 
    }

    static async getById(obj_id: number):Promise<Kart|undefined>{
        const product = await Kart.getAll()
        .then((ar_objetos) => {
            //Probamos usando el find()
            const obj_deseado:Kart|undefined = ar_objetos.find((element:Kart) => {
                return element.id == obj_id
            })
            return (obj_deseado != undefined && obj_deseado.id != undefined ? obj_deseado : undefined)
        })
        return product ? product : undefined
    }

    static async getAll():Promise<Array<Kart>>{
        const karts = await fs.promises.readFile(Kart.nombre_archivo, 'utf-8')
        .then((data:string) => {
            let karts:Array<Kart> = []
            if(data === "" || data == undefined) return karts
            else{ 
                const dataParsed:Array<any> = JSON.parse(data)
                if(dataParsed){
                    for (let index_kart:number = 0; index_kart < dataParsed.length; index_kart++) {
                        const jsonKart = dataParsed[index_kart]
                        if(jsonKart && jsonKart.id && jsonKart.timestamp){
                            let products:Array<Product> = []
                            if(jsonKart.products){
                                for (let index_prod = 0; index_prod < jsonKart.products.length; index_prod++) {
                                    const jsonProd = jsonKart.products[index_prod]
                                    const product:Product = new Product(
                                        jsonProd.nombre,
                                        jsonProd.descripcion,
                                        jsonProd.codigo,
                                        jsonProd.precio,
                                        jsonProd.foto,
                                        jsonProd.stock,
                                        jsonProd.id,
                                        jsonProd.timestamp
                                    )
                                    products.push(product)
                                }
                            }
                            
                            const kart:Kart = new Kart(jsonKart.id, jsonKart.timestamp, products)
                            karts.push(kart)
                        }
                    }
                }
                return karts
            }
        })
        .catch((errorGetAll:Error) => {
            console.log({errorGetAll})
        })
        return karts ? karts : []
    }

    static async deleteById(obj_id:number):Promise<void>{
        const ar_objetos = await Kart.getAll()

        const new_ar_objetos: Array<Kart> = []
        for (let index:number = 0; index < ar_objetos.length; index++) {
            const obj = ar_objetos[index]
            if(obj.id !== obj_id) new_ar_objetos.push(ar_objetos[index]) 
        }

        fs.promises.writeFile(Kart.nombre_archivo, JSON.stringify( new_ar_objetos, null, 2 ))
        .catch((errorDeleteAll:Error) => {
            console.log({errorDeleteAll})
        })
    }

    static async deleteAll():Promise<void>{
        fs.promises.writeFile(Kart.nombre_archivo, '', 'utf-8')
        .catch((errorDeleteAll:Error) => {
            console.log({errorDeleteAll})
        })
    }

}
