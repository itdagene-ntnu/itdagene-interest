const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  console.log(req.body);
  res.end('yes');
});

app.listen(port, () =>
  console.log(`Interestform API is waiting for POST on ${port}!`)
);
