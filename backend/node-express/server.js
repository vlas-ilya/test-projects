const express = require('express');
const config = require('../../config');

const app = express();

app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(list);
  console.log('Sent list of items');
});

app.listen(config.backend.port);

console.log(`node-express backend is listening on port ${config.backend.port}`);