var lista = [2, 3, 5, 7];
//Alternativas: Array<any> Array<number|string>
lista
    .map(function (x) { return x * x; })
    .forEach(function (x) { return console.log(x); });
var generateRandom = function () { return Math.round(Math.random() * 255); };
