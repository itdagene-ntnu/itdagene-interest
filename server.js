const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const interestHandler = require('./interestHandler');
const recaptchaHandler = require('./recaptchaHandler');

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

app.post('/', async function(req, res) {
  const entry = req.body;
  console.log(req);

  // Denne skal sjekke recaptcha, og retunerer et svar
  response = await recaptchaHandler(entry.recaptcha);
  console.log('RESPONSE', response);

  if (response.data.success) {
    console.log('recapatcha was good');
    interestHandler(entry);

    res.sendStatus(200);
    res.end();
  } else {
    console.log('recapatcha was bad');
    res.sendStatus(403);
    res.end();
  }
});

app.listen(port, () => console.log(`Interestform API is up on port:${port}!`));
