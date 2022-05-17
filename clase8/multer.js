const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads_multer')
    },
    filename: (req, file, cb) => {
        //Para usar el nombre original
        //cb(null, `${Date.now()}-${file.originalname}.jpg`) 
        cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
})

const upload = multer({ storage })

let app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use('/static', express.static(__dirname+'/public_multer'))
app.use('/uploads', express.static(__dirname+'/uploads_multer'))

app.post('/uploadFile', upload.single('myFile'), (req, res) => {
    const file = req.file
    if (!file) {
      return res.status(400).json({
        error: 'Por favor sube un archivo'
      })
    }
   
    return res.json(file)
})

app.post('/uploadMultiple', upload.array('myFiles', 12), (req, res) => {
    const files = req.files
    if (!files.length) {
      return res.status(400).json({
        error: 'Por favor sube archivos'
      })
    }
   
    return res.json(files)
})

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
})

app.on('error', (error) => {
    console.log({error})
})