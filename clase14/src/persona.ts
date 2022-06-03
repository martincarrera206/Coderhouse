export default class Persona {
    private name: String
    private lastname: String

    constructor(name: String, lastname: String){
        this.name = name
        this.lastname = lastname
    }

    getFullName(): String {
        return `${this.name} ${this.lastname}`
    }
}