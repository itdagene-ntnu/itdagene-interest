const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const newInterest = require('./sheethandler');

const app = express();
const port = 8000;

// Secure the API
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
  const entry = req.body;
  if (entry == undefined) {
    res.sendStatus(500);
    res.end();
  }
  if (entry.recapatcha == '') {
    res.sendStatus(403);
    res.end();
  }

  delete entry['recapatcha'];
  newInterest(entry);
  res.sendStatus(200);
  res.end();
});

app.listen(port, () => console.log(`Interestform API is up on port:${port}!`));
