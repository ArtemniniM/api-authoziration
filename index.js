const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const cont_api = require('./src/controllers/api.controller');

app.use(cors());
app.use('/', bodyParser.json());
app.use('/api', cont_api);

app.use('/', (err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000, () => {
  console.log('ready');
});
