const lista:Array<number> = [2, 3, 5, 7]
//Alternativas: Array<any> Array<number|string>

lista
    .map((x:number):number => x*x) 
    .forEach((x:number):void => console.log(x))

const generateRandom = ():number => Math.round(Math.random() * 255)