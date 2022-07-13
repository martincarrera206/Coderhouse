const express = require('express')
const { Server: HttpServer, request } = require('http')
const { Server: IOServer } = require('socket.io')
const {faker} = require('@faker-js/faker')
faker.locale = 'es'

let app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const PORT = 8080

const {options_mysql} = require('./db/ops_mysql')
const {options_sqlite} = require('./db/ops_sqlite')

const knex_mysql = require('knex')(options_mysql)
const knex_sqlite = require('knex')(options_sqlite)

// Funcion que crea las tablas productos y mensajes (en caso de que no existan)
const createTablesFn = require('./createTablesFn')
createTablesFn(knex_mysql, knex_sqlite)

const { engine } = require('ejs')

// definimos el motor de plantillas a utilizar
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))

app.set('views', './views')
app.set('view engine', 'ejs')

const { Router } = express //Esto es igual a const Router = express.Router
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/images/productos')
    },
    filename: (req, file, cb) => {
        //Para usar el nombre original
        //cb(null, `${Date.now()}-${file.originalname}.jpg`) 
        cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
})

const upload = multer({ storage })

const Message = require(__dirname+'/message')
Message.knex = knex_sqlite
const Producto = require(__dirname+'/product')
Producto.knex = knex_mysql

const productRouter = Router()

app.get('/', (request, response) => {
    console.log('GET request recibido index')
    ;(async()=>{
        const productos = await Producto.getAll()
        const resp_data = {
            page_title:'Nuevo Producto',
            success_action: '',
            success: 0,
            productos : productos
        }
        //console.log({resp_data})
    
        console.log({resp_data})
        return response.render('index', resp_data)

    })()
})

//No hace falta indicar el prefijo pq se lo indicamos mas abajo en el use
productRouter.get('', (request, response, next) => {
    console.log('GET request recibido')
    ;(async()=>{
        const productos = await Producto.getAll()

        const resp_data = {
            productos: productos,
            page_title: 'Listado de Productos'
        }

        return response.status(201).render('list_products', resp_data)
    })()
})

productRouter.get('/:id', (request, response, next) => {
    console.log('GET request recibido')
    ;(async()=>{
        const id = request.params.id ? Number.parseInt(request.params.id) : 0
        let product = await Producto.getById(id)
        if(!product){
            return response.status(404).json({
                error: "producto no encontrado"
            })
        }
        return response.status(201).json(product)
    })()
})

productRouter.post('', (request, response, next) => {
    console.log('POST request recibido')
    ;(async()=>{
        let product = new Producto(request.body.title, Number.parseFloat( request.body.price), request.body.thumbnail)
        product.id = await Producto.create(product)
        console.log({product})
        
        //Emit nuevo prod para todos los clientes
        io.sockets.emit('loadProduct', product)
        //Satus 201 para decir que el registro se creo exitosamente
        return response.status(201).json(product)
    })()
})

productRouter.put('/:id', upload.single('thumbnail'), (request, response, next) => {
    console.log('PUT request recibido')
    ;(async()=>{
        const id = request.params.id ? Number.parseInt(request.params.id) : 0
        let product = await Producto.getById(id)
        if(product === null) return response.status(404).json({
            error: "producto no encontrado"
        })

        const file = request.file
        if(file) product.thumbnail = 'assets/images/productos/'+file.filename

        product.title = request.body.title
        product.price = Number.parseFloat( request.body.price)
        await Producto.update(product)

        const resp_data = {
            page_title:'Nuevo Producto',
            success: 1,
            success_action: 'guardar'
        }
        //Satus 201 para decir que el registro se creo exitosamente
        return response.status(201).render('index', resp_data)
    })()
})

productRouter.delete('/:id', (request, response, next) => {
    console.log('DELETE request recibido')
    ;(async()=>{
        const id = request.params.id ? Number.parseInt(request.params.id) : 0
        let product = await Producto.getById(id)
        if(product === null) return response.status(404).json({
            error: "producto no encontrado"
        })
        const prod_delt = await Producto.deleteById(id)
        if(!prod_delt){
            return response.status(404).json({
                error: "producto no encontrado"
            })
        }

        const resp_data = {
            message: "Exito al eliminar",
            product: product
        }

        //Satus 201 para decir que el registro se creo exitosamente
        return response.status(201).render('list_product', resp_data)
    })()
})

//Indico que todas las rutas que de de alta en el Router van a estar con ese prefijo
app.use('/productos', productRouter)

app.get('/api/productos-test', (request, response, next) => {
    console.log('GET producto faker request recibido')

    ;(async()=>{
        const faker_products = []
        for (let f_index = 0; f_index < 5; f_index++) {
            const f_product_title = faker.commerce.product()
            const f_product_price = faker.commerce.price(100, 1000)
            const f_product_thumbnail = faker.image.imageUrl(640, 640)
            
            let f_product = new Producto(f_product_title, f_product_price, f_product_thumbnail)
            f_product.id = await Producto.create(f_product)
            faker_products.push(f_product)
        }

        //Satus 201 para decir que el registro se creo exitosamente
        return response.status(201).json(faker_products)
    })()
})

app.get('/productos-test', (request, response, next) => {
    console.log('GET producto faker request recibido')
    ;(async()=>{
        const productos = []

        const resp_data = {
            productos: productos,
            page_title: 'Listado de Productos'
        }

        return response.status(201).render('list_faker_products', resp_data)
    })()
})

app.get('/chat', (request, response) => {
    response.render('chat')
})

//Middleware de errores
app.use((error, request, response, next) => {
    return response.status(500).json({
        error: error
    })
})

httpServer.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})

httpServer.on('error', (error) => {
    console.log({error})
})

let users = []
let messages = []

io.on('connection', (socket) => {

    socket.on('getProducts', (data) => {
        ;(async() => {
            const productos = await Producto.getAll()
            socket.emit('loadProducts', productos)
        })()
    })

    socket.on('saveProduct', data => {
        ;(async() => {
            let product = new Producto(data.title, data.price, data.thumbnail)
            product = await Producto.create(product)
            console.log({product})

            socket.emit('loadProduct', product)
            socket.broadcast.emit('loadProduct', product)
        })()
    })

    // Chat Events
    socket.on('joinChat', (data) => {
        /*
        const user = {
            id: socket.id,
            username: data.username,
            email: data.username,
            avatarId: Math.ceil(Math.random() * 6)
        }
        */
        //console.log({data})
        let user = {
            id: socket.id,
            nombre: data.user.nombre,
            apellido: data.user.apellido,
            email: data.user.email,
            edad: data.user.edad,
            alias: data.user.alias
        }
        const rand = Math.ceil(Math.random() * 6)
        user.avatar = data.user.avatar || `https://bootdey.com/img/Content/avatar/avatar${rand}.png`

        users.push(user)
        socket.emit('loadUser', user)
        socket.broadcast.emit('notification', `${user.nombre} ${user.apellido} se ha unido a la sala`)
        io.emit('users', users)
    })

    socket.on('messageInput', data => {
        ;(async() => {
            const now = new Date()
            const user = users.find(user => user.id === socket.id)
            console.log({user})
            let message = {
                text: data,
                time: `${now.toLocaleString()}`,
                user_id: user.id
            }
            message.id = await Message.create(message)
            message.user = user
            message.author = user

            //====Normilizr
            await Message.createNormalized(message)
            /*
            const messages = await Message.getAll()
            console.log({messages})
            */
            socket.emit('myMessage', message)
            socket.broadcast.emit('message', message)
        })()
    })

    socket.on('disconnect', reason => {
        const user = users.find(user => user.id === socket.id)
        users = users.filter(user => user.id !== socket.id)
        if (user) {
          socket.broadcast.emit('notification', `${user.username} se ha ido al chat`)
        }
        io.sockets.emit('users', users)
    })
     
})