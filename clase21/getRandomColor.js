export default () => {
    const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']
    return colores[Math.floor((Math.random() * 5))]
}