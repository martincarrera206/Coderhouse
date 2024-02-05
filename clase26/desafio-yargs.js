/*
const options = { alias: { m: 'modo', p: 'puerto', d: 'debug' }, 
default: {modo: 'prod', puerto: 0, debug: false}}
const args = parseArgs(process.argv.slice(2), options)
*/

//node main.js 1 2 3 -m dev -p 8080 -d

const yargs = require('yargs/yargs')
const args = yargs(process.argv.slice(2))
    .default({
        modo: 'prod',
        puerto: 0,
        debug: false
    })
    .alias({
        m: 'modo',
        p: 'puerto',
        d: 'debug'
    })
    .boolean('debug')
    .argv

console.log(args)