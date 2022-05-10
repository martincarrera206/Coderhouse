class Usuario{
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre}  ${this.apellido}`;
    }

    addMascota(nombre_mascota){
        this.mascotas.push(nombre_mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre_libro, autor_libro){
        this.libros.push({nombre: nombre_libro, autor: autor_libro});
    }

    getBookNames(){
        let nombre_libros = [];
        this.libros.forEach(libro => { nombre_libros.push(libro.nombre); });
        return nombre_libros;
    }
}

const usuario = new Usuario('Pepe', 'Guetierrez', [], []);
console.log('Nombre: ' + usuario.getFullName());

usuario.addMascota('Serpiente');
usuario.addMascota('Perro');
usuario.addMascota('Cerdo');
console.log('Cant. Mascotas: ' + usuario.countMascotas());

usuario.addBook('1984', 'George Orwell');
usuario.addBook('Brave New World', 'Aldous Huxley');
console.log('Libros: ' + usuario.getBookNames());

/*
Output:
Nombre: Pepe  Guetierrez
Cant. Mascotas: 3
Libros: 1984,Brave New World
*/
