const { exec, execFile } = require('child_process')

exec('dir', (error, stdout, stderr) => {
 if (error) {
   console.error(`error: ${error.message}`)
   return
 }

 if (stderr) {
   console.error(`stderr: ${stderr}`)
 }

 console.log(`stdout: \n${stdout}`)
})

/*
execFile(`${__dirname}/dir.bat`, (error, stdout, stderr) => {
 if (error) {
   console.error(`error: ${error.message}`)
   return
 }

 if (stderr) {
   console.error(`stderr: ${stderr}`)
 }

 console.log(`stdout: \n${stdout}`)
})
*/