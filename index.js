const express = require('express')
const app = express()
app.use(express.static('public'));
app.get('/',(req, res) => {
  res.send('Hello World!');
});
app.listen(5566, () => {
  console.log('Listening on port 5566...');
})
