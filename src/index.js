const express = require('express');
const { v4 } = require('uuid');

const app = express();

app.post('/account', (req, res) => {
  const { name, cpf } = req.body;
});

app.listen(3030);