const tracer = require('./tracer')('copilot-observability');
const runes = require('runes');
const express = require('express')
const morgan = require('morgan');
const app = express()
const port = 3000

app.use(morgan('tiny'));
app.use(express.raw({
  limit: '100kb',
  type: '*/*'
}));

app.all('/', (req, res) => {
  if (req.body.length) {
    var reqString=req.body.toString();
    console.log(`Call to reverse string:${reqString}`);
    let stringRunes = runes(req.body.toString()+'Hello');
    res.send(stringRunes.reverse().join(""));
  } else {
    res.send();
  }
})

var server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

process.once('SIGTERM', function () {
  console.log('Received SIGTERM signal, closing server');
  server.close();
});
