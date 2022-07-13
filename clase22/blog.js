const { normalize, denormalize, schema } = require('normalizr')
const util = require('util')

const print = (obj) => {
 console.log(util.inspect(obj, false, 12, true))
}

const blog = require('./blog.json')

//print(blog)

// DEFINICION DE ESQUEMAS

// Definimos un esquema para usuarios (autores y comentadores)
const userSchema = new schema.Entity('users')

// Definimos un esquema de comentarios
const commetSchema = new schema.Entity('comments', {
 commenter: userSchema
})

// Definimos un esquema de posts
const postSchema = new schema.Entity('posts', {
 author: userSchema,
 comments: [ commetSchema ]
})

// Definimos el esquema del blog
const blogSchema = new schema.Entity('blog', {
 posts: [ postSchema ]
})

// MUESTRO RESULTADOS
console.log('===== OBJETO ORIGINAL =====')
console.log(JSON.stringify(blog).length)
print(blog)

console.log('===== OBJETO NORMALIZADO =====')
let normalizedBlog = normalize(blog, blogSchema)
console.log(JSON.stringify(normalizedBlog).length)
print(normalizedBlog)


console.log('===== OBJETO DENORMALIZADO =====')
let denormalizedBlog = denormalize(normalizedBlog.result, blogSchema, normalizedBlog.entities)
console.log({normalizedBlog})
console.log(JSON.stringify(denormalizedBlog).length)
print(denormalizedBlog)