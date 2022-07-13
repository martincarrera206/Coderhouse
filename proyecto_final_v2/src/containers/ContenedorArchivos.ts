import fs  from "fs";

export default class ContenedorArchivo{
    static nombre_archivo: string = ''

    private id?: number
    private timestamp?: number

    constructor(nombre_archivo?: string){
        if(nombre_archivo) ContenedorArchivo.nombre_archivo = nombre_archivo
    }

    // ------- GETERS -------

    getId():number|undefined{
        return this.id
    }
    getTimestamp():number|undefined{
        return this.timestamp
    }

    // ------- SETERS -------

    setId(id:number):void{
        this.id = id
    }
    setTimestamp(timestamp:number):void{
        this.timestamp = timestamp
    }

    // ------- FUNCIONES CRUD -------

    async save():Promise<ContenedorArchivo>{
        let ar_objetos = await this.getAll()
        
        const ultimo_obj = (ar_objetos != undefined && ar_objetos.length >= 1 ? ar_objetos[ar_objetos.length - 1] : undefined)
        this.id = (ultimo_obj != undefined && ultimo_obj.id !== undefined ? ultimo_obj.id + 1 : 1)
        this.timestamp = Date.now()
        ar_objetos.push(this)

        fs.promises.writeFile(ContenedorArchivo.nombre_archivo, JSON.stringify( ar_objetos, null, 2 ))
        .catch((errorSave:Error) => {
            console.log({errorSave})
        })
        return this
    }

    async update():Promise<void>{
        this.getAll()
        .then((ar_objetos:Array<ContenedorArchivo>) => {
            let new_ar_objetos:Array<ContenedorArchivo> = []
            for (let index:number = 0; index < ar_objetos.length; index++) {
                const obj:ContenedorArchivo = ar_objetos[index]
                new_ar_objetos.push(ar_objetos[index])
                fs.promises.writeFile(ContenedorArchivo.nombre_archivo, JSON.stringify( new_ar_objetos, null, 2 ))
                .catch((errorUpdate:Error) => {
                    console.log({errorUpdate})
                })
            }}
        )        
    }

    async getById(obj_id: number):Promise<ContenedorArchivo|undefined>{
        const _obj = await this.getAll()
        .then((ar_objetos:any) => {
            //Probamos usando el find()
            const obj_deseado:ContenedorArchivo|undefined = ar_objetos.find((element:ContenedorArchivo) => {
                return element.id == obj_id
            })
            return (obj_deseado != undefined && obj_deseado.id != undefined ? obj_deseado : undefined)
        })
        return _obj ? _obj : undefined
    }

    async getAll():Promise<Array<ContenedorArchivo>>{
        const _objs = await fs.promises.readFile(ContenedorArchivo.nombre_archivo, 'utf-8')
        .then((data:string) => {
            if(data === "" || data == undefined) return []
            else{ 
                let ar_objects:Array<ContenedorArchivo> = []
                const dataParsed:Array<any> = JSON.parse(data)
                if(dataParsed){
                    for (let index:number = 0; index < dataParsed.length; index++) {
                        const jsonElement = dataParsed[index]
                        const _obj:ContenedorArchivo = new ContenedorArchivo()
                        _obj.setId(jsonElement.id)
                        _obj.setTimestamp(jsonElement.timestamp)
                        ar_objects.push(_obj)
                    }
                }
                return ar_objects
            }
        })
        .catch((errorGetAll:Error) => {
            console.log({errorGetAll})
        })
        return _objs ? _objs : []
    }

    async deleteById(obj_id:number):Promise<void>{
        const ar_objetos = await this.getAll()

        const new_ar_objetos: Array<ContenedorArchivo> = []
        for (let index = 0; index < ar_objetos.length; index++) {
            const obj = ar_objetos[index]
            if(obj.id !== obj_id) new_ar_objetos.push(ar_objetos[index]) 
        }

        fs.promises.writeFile(ContenedorArchivo.nombre_archivo, JSON.stringify( new_ar_objetos, null, 2 ))
        .catch((errorDeleteAll:Error) => {
            console.log({errorDeleteAll})
        })
    }

    async deleteAll():Promise<void>{
        fs.promises.writeFile(ContenedorArchivo.nombre_archivo, '', 'utf-8')
        .catch((errorDeleteAll:Error) => {
            console.log({errorDeleteAll})
        })
    }
}
