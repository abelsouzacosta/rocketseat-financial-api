const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

app.post('/account', (req, res) => {
  const { name, cpf } = req.body;

  const customerAlreadyExists = customers.some(element => element.cpf === cpf);

  if (customerAlreadyExists)
    return res.status(400).json({
      message: "Customer already exists"
    });

  customers.push({ 
    id: uuidV4(), 
    name,
    cpf,
    statement: []
  });

  return res.status(201).json(customers);
});

app.listen(3030);