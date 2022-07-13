const normalizr = require('normalizr')
const fs = require('fs')

const blogpost = require('./blogpost.json')

// Definimos un esquema de usuarios (autores y comentadores)
const authorSchema = new normalizr.schema.Entity('authors')

// Definimos un esquema de comentadores
const commentSchema = new normalizr.schema.Entity('comments')

// Definimos un esquema de artículos
const postSchema = new normalizr.schema.Entity('posts', {
    author: authorSchema,
    comments: [ commentSchema ]
})

const normalizedBlogpost = normalizr.normalize(blogpost, postSchema);

const denormalizedBlogpost = normalizr.denormalize(normalizedBlogpost.result, postSchema, normalizedBlogpost.entities);

fs.promises
    .writeFile('./blogpostNormalized.json', JSON.stringify(normalizedBlogpost, null, 2))
    .then(_ => console.log('ok'))