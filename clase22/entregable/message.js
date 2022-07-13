const { normalize, denormalize, schema } = require('normalizr')
const fs = require('fs')

// ========= SCHEMAS =========
const userSchema = new schema.Entity('users')
const authorSchema = new schema.Entity('authors', {auther: userSchema}, { idAttribute: 'email' })
const messageSchema = new schema.Entity('messages', { author: authorSchema })
const chatSchema = new schema.Entity('chat', { messages: [messageSchema] })

// ===========================

class Message{
    static knex

    constructor(text, time, user_id, id = null){
        this.text = text
        this.time = time
        this.user_id = user_id
        if(id) this.id = id
    }

    static createNormalized(_obj){
        return Message.getAllNormilized()
        .then(messagesNormilized => {
            const messages = denormalize(messagesNormilized, chatSchema, messagesNormilized.entities)
            console.log({messages})
            messages.push(_obj)
            const normalizedChat = normalize(messages, chatSchema);
    
            return fs.promises
            .writeFile('./messages.json', JSON.stringify(normalizedChat, null, 2))
            .then(_ => console.log('ok'))
        })        
    }

    static getAllNormilized(){
        return fs.promises
        .readFile('./messages.json')
        .then(data => {
            return JSON.parse(data)
        })
    }

    static create(_obj){
        return Message.knex.from('messages')
            .insert([_obj])
            .then((prod_ids) => {return prod_ids[0]})
            .catch(err => console.log(`Error: ${err.message}`))
    }

    static update(_obj){
        return Message.knex.from('messages')
            .where('id', _obj.id)
            .update({ text: _obj.text, time: _obj.time, user_id: _obj.user_id})
            .then(messages => {
                console.log(`Messages actualizados: ${messages}`)
                if(messages) return true
                else return false
            })
            .catch(err => console.log(`Error: ${err.message}`))
    }

    static getById(obj_id){
        return Message.knex.from('messages')
            .where('id', obj_id)
            .then(messages => {
                if(messages)
                    return new Message(message[0].text, message[0].time, message[0].user_id)
                else return false
            })
            .catch(err => console.log(`Error: ${err.message}`))
    }

    static getAll(){
        return Message.knex.from('messages')
        .select('*')
        .then(messages => {
            let ar_objetos = []
            if(messages.length > 0){
                console.log(`Total de messages: ${messages.length}`)
                messages.forEach(message => {
                    const prod = new Message(message.text, message.time, message.user_id, message.id)
                    ar_objetos.push(prod)
                })
            }
            return ar_objetos
        })
        .catch(err => console.log(`Error: ${err.message}`))
    }

    static deleteById(obj_id){
        return Message.knex.from('messages')
            .where('id', obj_id)
            .del()
            .then(messages => {
                console.log(`Messages eliminados: ${messages}`)
                if(messages) return true
                else return false
            })
            .catch(err => console.log(`Error: ${err.message}`))
    }

    static deleteAll(){
        return Message.knex.from('messages')
        .del()
        .then(messages => {
            console.log(`Messages eliminados: ${messages}`)
            if(messages) return true
            else return false
        })
        .catch(err => console.log(`Error: ${err.message}`))
    }

}

module.exports = Message
