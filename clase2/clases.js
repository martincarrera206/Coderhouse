class Persona{
    constructor (nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }

    static saludoCorto = "Hola";

    saludoCompleto(){
        console.log(`buenas, soy ${this.nombre}`);
    }

    static saludoEstatico(){
        console.log(Persona.saludoCorto);
    }
}

const pepe = new Persona('Pepe', 30);
console.log(pepe);
pepe.saludoCompleto();
Persona.saludoEstatico();