const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const util = require('util');
const exec = util.promisify(require('child_process').exec)

app.use(express.static('public'));

app.get('/api/v1/getjson/:filetype/:filename', async (req, res) => {
  const { filetype, filename } = req.params;
  const filePath = `private/${filetype}/${filename}.json`
  try {
    const data = await readFileAsync(filePath)
    res.json(JSON.parse(data))
  } catch (err) {
    res.json(JSON.parse('public/default.json'))
    console.log(err)
  }
})
app.post('/api/v1/soundwavify',jsonParser , (req, res) => {
  console.log('----------')
  console.log('Got a post')
  console.log('----------')
  const { filetype, filepath } = req.body
  console.log(filetype, filepath)
  async function downloadMusicToJson() {
    try {
        const { stdout, stderr } = await exec(`./download_to_json.sh "${filepath}" ${filetype}`);
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    }catch (err) {
       console.error(err);
    };
  };
  // const downloadMusicToJson = exec( `sh download_to_json.sh ${filepath} ${filetype}` )
  downloadMusicToJson()
  res.send('ok:D')
})

app.listen(5566, () => {
  console.log('Listening on port 5566...');
})
