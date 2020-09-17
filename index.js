const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const exec = require('child_process').exec
app.use(express.static('public'));

app.get('/api/v1/getjson/:filetype/:filename', async (req, res) => {
  const { filetype, filename } = req.params;
  const filePath = `private/${filetype}/${filename}.json`
  try {
    const data = await readFileAsync(filePath)
    res.json(JSON.parse(data))
  } catch (err) {
    res.send("you don't belong here")
    console.log(err)
  }
})
app.post('/api/v1/soundwavify',jsonParser , async (req, res) => {
  console.log('----------')
  console.log('Got a post')
  console.log('----------')
  console.log(req.body.filepath, req.body.filetype)
  const { filetype, filepath } = req.body
  // const downloadMusicToJson = exec( `sh download_to_json.sh ${filepath} ${filetype}` )
  // await downloadMusicToJson()
  res.send('ok:D')
})

app.listen(5566, () => {
  console.log('Listening on port 5566...');
})
