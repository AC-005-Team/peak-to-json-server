const express = require('express')
const app = express()
app.get('/',(req, res) => {
  res.send('Hello World!');
});
app.listen(5566, () => {
  console.log('Listening on port 5566...');
})

const exec = require('child_process').exec
var yourscript = exec('sh hi.sh',
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });