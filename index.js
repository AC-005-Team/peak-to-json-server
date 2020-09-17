const express = require('express')
const app = express()
app.use(express.static('public'));
// app.get('/',(req, res) => {
//   res.send('Hello World!');
// });
app.get('/api/v1/:id',(req, res) => {
  const songId = req.params.id
  res.send('Hello World!');
  res.json('private/song_peaks/muse.json')
});
app.listen(5566, () => {
  console.log('Listening on port 5566...');
})
