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
    res.send('{"data":[-0.5,0.31,-0.44,0.47,-0.31,0.28,-0.63,0.53,-0.91,0.88,-1.13,0.97,-1.31,0.94,-0.59,0.88,-0.63,0.72,-1.13,0.81,-0.75,0.69,-0.44,0.69,-0.53,0.53,-0.56,0.53,-0.47,0.47,-0.28,0.28,-0.34,0.31,-0.28,0.31,-0.38,0.31,-0.28,0.25,-0.56,0.63,-0.56,0.75,-0.41,0.28,-0.56,0.5,-0.69,0.53,-0.5,0.5,-0.91,0.72,-0.94,1.0,-0.59,0.66,-0.53,0.59,-0.84,0.84,-0.47,0.44,-0.53,0.5,-0.53,0.63,-0.47,0.38,-0.53,0.56,-0.34,0.41,-0.34,0.38,-0.25,0.34,-0.28,0.38,-0.44,0.22],"channels":1,"length":41,"version":2,"sample_rate":48000,"samples_per_pixel":2400,"bits":8}')
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
