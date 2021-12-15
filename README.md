## FinAPI - Financeira

---

## Requisitos

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [ ] Deve ser possível atualizar os dados da conta do cliente
- [ ] Deve ser possível obter os dados da conta do cliente
- [ ] Deve ser possível deletar uma conta

---

### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com o CPF já existente
- [x] Não deve ser possível fazer um deposito numa conta não existente
- [x] Não deve ser possível buscar o extrato numa conta não existente
- [x] Não deve ser possível fazer saque de uma conta não existente
- [ ] Não deve ser possível excluir uma conta não existente
- [x] Não deve ser possível fazer um saque de um valor maior do que o saldo da conta
