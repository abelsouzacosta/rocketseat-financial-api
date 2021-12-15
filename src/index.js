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

// retrives the total balance of an account
function getTotalBalance(statement) {
  return statement.reduce((acc, operation) => {
    if (operation.type === 'credit')
      return acc + operation.amount;
    else 
      return acc - operation.amount;
  }, 0);
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

app.put('/account', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;
  const { name } = req.body;

  if (!name) 
    return res.status(403).json({
      message: "Please eneter a valid name"
    });

  customer.name = name;

  return res.status(201).json(customer);
});

app.get('/statement', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  return res.status(200).json({
    name: customer.name,
    cpf: customer.cpf,
    statement: customer.statement
  });
});

app.get('/statement/date', verifyIfExistsAccountCPF, (req, res) => {
  const { date } = req.query;
  const { customer } = req;

  const dateFormat = new Date(date + ' 00:00');

  let result = customer.statement.filter(element => element.created_at.toDateString() === new Date(dateFormat).toDateString());

  if (!result)
    return res.status(400).json({
      message: "There's no statement with the given date"
    });

  return res.status(200).json(result);
})

app.post('/deposit', verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;

  const statementOperation = {
    description, 
    amount,
    created_at: new Date(),
    type: 'credit'
  };

  customer.statement.push(statementOperation);

  return res.status(201).json(customer);
});

app.post('/withdraw', verifyIfExistsAccountCPF, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;

  // obtem o total de saldo ded uma determinada conta
  const totalBalance = getTotalBalance(customer.statement);

  if (amount > totalBalance)
    return res.status(400).json({
      message: "Not allowed - insufficient resources"
    });

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit'
  }

  customer.statement.push(statementOperation);

  return res.status(201).json(customer);
});

app.listen(3030);