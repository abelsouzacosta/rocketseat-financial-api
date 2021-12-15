const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();

const customers = [];

app.post('/account', (req, res) => {
  const { name, cpf } = req.body;
  const id = uuidV4();

  customers.push({ id, name, cpf, statement: [] });

  return res.status(201).send('ok');
});

app.listen(3030);