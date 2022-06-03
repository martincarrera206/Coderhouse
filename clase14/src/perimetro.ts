export default class Perimetro {
    static cuadrado(lado:number):number{
        return lado * 4
    }
    
    static rectangulo(base: number, altura: number):number{
        return base * altura
    }

    static circulo(diametro: number):number{
        return Math.pow(Math.PI * (diametro / 2), 2)
    }
}