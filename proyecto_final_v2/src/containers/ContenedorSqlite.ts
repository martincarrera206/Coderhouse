import knex from 'knex'

export default class ContenedorSQLite{
    static knex?: any
    static table?: any
    
    private id?: number
    private timestamp?: number

    constructor(options?: any, table?:any){
        if(options) ContenedorSQLite.knex = knex(options)
        if(table) ContenedorSQLite.table = table
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

    async save():Promise<ContenedorSQLite>{
        return ContenedorSQLite.knex
        .from(ContenedorSQLite.table)
        .insert(this)
    }

    async update():Promise<void>{
        return ContenedorSQLite.knex
        .from(ContenedorSQLite.table)
        .where('id', this.id)       
    }

    static async getById(obj_id: number):Promise<ContenedorSQLite|undefined>{
        return ContenedorSQLite.knex
            .from(ContenedorSQLite.table)
            .select('*')
            .where('id', obj_id)
            .then((items: any) => {
                return items[0] ? items[0] : undefined
            })
    }

    static async getAll():Promise<Array<ContenedorSQLite>>{
        return ContenedorSQLite.knex
            .from(ContenedorSQLite.table)
            .select('*')
            .then((items: any) => {
                return items ? items : []
            })
    }

    static async deleteById(obj_id:number):Promise<void>{
        return ContenedorSQLite.knex
            .from(ContenedorSQLite.table)
            .where('id', obj_id)
            .del()
    }

    static async deleteAll():Promise<void>{
        return ContenedorSQLite.knex
        .from(ContenedorSQLite.table)
        .del()
    }
}
