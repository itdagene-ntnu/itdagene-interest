const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const port = 8000;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/', function(req, res) {
  // POST to google sheets
  console.log(req.body);
  res.sendStatus(200);
  res.end();
});

app.listen(port, () =>
  console.log(`Interestform API is waiting for POST on ${port}!`)
);
