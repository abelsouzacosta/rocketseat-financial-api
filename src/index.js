const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

// Middleware
function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer)
    return res.status(404).json({
      message: "Customer not found",
    });

  req.customer = customer;

  return next();
}

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

app.get('/statement', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  return res.status(200).json({
    name: customer.name,
    cpf: customer.cpf,
    statement: customer.statement
  });
});

app.listen(3030);