const db = require('./db')
const userModel = require('./models/user')

const {Schema, model} = require('mongoose');
const { count } = require('./models/user');

const estudianteSchema = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: {type: Number, required: true},
    dni: {type: String, required: true, unique:true},
    curso: {type: String, required: true},
    nota: {type: Number, required: true}
})

const estudianteModel = model('Estudiante', estudianteSchema)

;(async () => {

    await db
    // 1.a
    const estudiantesOrdenados = await estudianteModel.find({}, {nombre: 1, apellido: 1, _id: 0}).sort({nombre: 1})
    console.log({estudiantesOrdenados})
    // 1.b
    const estudianteMasJoven = await estudianteModel.findOne({}, {nombre: 1, apellido: 1, edad: 1, _id: 0}).sort({edad: 1})
    console.log({estudianteMasJoven})
    // 1.c
    const estudianteDeCurso = await estudianteModel.find({curso: '2A'}, {nombre: 1, apellido: 1, curso: 1, _id: 0})
    console.log({estudianteDeCurso})
    // 1.d
    const estudianteMasJoven2 = await estudianteModel.findOne({}, {nombre: 1, apellido: 1, edad: 1, _id: 0}).sort({edad: 1}).skip(1)
    console.log({estudianteMasJoven2})
    // 1.e
    const estudiantesOrdenadosDesc = await estudianteModel.find({}, {nombre: 1, apellido: 1, curso: 1, _id: 0}).sort({apellido: -1})
    console.log({estudiantesOrdenadosDesc})
    // 1.f
    const estudiantesDiez = await estudianteModel.find({nota: 10}, {nombre: 1, apellido: 1, nota: 1, _id: 0})
    console.log({estudiantesDiez})
    // 1.g
    const estudianteNotas = await estudianteModel.find({}, {nota: 1, _id: 0})
    let promedio = 0
    estudianteNotas.forEach(estudianteNota => promedio += estudianteNota.nota)
    promedio = promedio / estudianteNotas.length
    console.log({promedio})
    // 1.h
    const estudianteNotasCurso = await estudianteModel.find({curso: '1A'}, {nota: 1, _id: 0})
    let promedioCurso = 0
    estudianteNotasCurso.forEach(estudianteNota => promedioCurso += estudianteNota.nota)
    promedioCurso = promedioCurso / estudianteNotas.length
    console.log({promedioCurso})

    // Cierro coneccion a la db
    process.exit()
})()
   