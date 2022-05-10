//const cuenta_global = 0;
class Contador{
    static cuenta_global = 0;

    constructor(responsable){
        this.responsable = responsable;
        this.cuenta_indv = 0;
    }

    obtenerResponsable(){
        return this.responsable;
    }

    obtenerCuentaIndividual(){
        return this.cuenta_indv;
    }

    static obtenerCuentaGlobal(){
        return Contador.cuenta_global;
    }

    contar(){
        this.cuenta_indv++;
        Contador.cuenta_global++;
    }
}

const pepe = new Contador('Pepe');
const duke = new Contador('Duke');

console.log(pepe.obtenerResponsable());
pepe.contar();
console.log(pepe.obtenerCuentaIndividual());


console.log(duke.obtenerResponsable());
duke.contar();
duke.contar();
console.log(duke.obtenerCuentaIndividual());

console.log("Cuenta global");
console.log(Contador.obtenerCuentaGlobal());