import knex from 'knex'

export default class ContenedorMySQL{
    static knex?: any
    static table?: any
    
    private id?: number
    private timestamp?: number

    constructor(options?: any, table?:any){
        if(options) ContenedorMySQL.knex = knex(options)
        if(table) ContenedorMySQL.table = table
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

    async save():Promise<ContenedorMySQL>{
        return ContenedorMySQL.knex
        .from(ContenedorMySQL.table)
        .insert(this)
    }

    async update():Promise<void>{
        return ContenedorMySQL.knex
        .from(ContenedorMySQL.table)
        .where('id', this.id)       
    }

    static async getById(obj_id: number):Promise<ContenedorMySQL|undefined>{
        return ContenedorMySQL.knex
            .from(ContenedorMySQL.table)
            .select('*')
            .where('id', obj_id)
            .then((items: any) => {
                return items[0] ? items[0] : undefined
            })
    }

    static async getAll():Promise<Array<ContenedorMySQL>>{
        return ContenedorMySQL.knex
            .from(ContenedorMySQL.table)
            .select('*')
            .then((items: any) => {
                return items ? items : []
            })
    }

    static async deleteById(obj_id:number):Promise<void>{
        return ContenedorMySQL.knex
            .from(ContenedorMySQL.table)
            .where('id', obj_id)
            .del()
    }

    static async deleteAll():Promise<void>{
        return ContenedorMySQL.knex
        .from(ContenedorMySQL.table)
        .del()
    }
}
