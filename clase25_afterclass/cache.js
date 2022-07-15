const redis = require('redis')

const username = 'default'
const password = 'cxUlQ72lVVFAi9YdVui2d4n9JXwUJqDo'
const host = 'redis-19394.c273.us-east-1-2.ec2.cloud.redislabs.com'
const port = '19394'
// Para conectar desde el cli
// Para usar el redis remoto con RedisLabs
const client = redis.createClient({
    url: `redis://${username}:${password}@${host}:${port}`,
    legacyMode: true
})
client.connect()

const getProducts = () => {
    //Para crear una promesa desde un callback
    return new Promise((resolve, reject) => {
        return client.get('products', (error, value) => {
            if(error) return reject(error)

            return resolve(value)
        })
    })
}

const setProducts = (products) => {
    client.set('products', JSON.stringify(products))
}

const removeProducts = () => {
    client.del('products')
}

module.exports = {
    getProducts,
    setProducts,
    removeProducts
}