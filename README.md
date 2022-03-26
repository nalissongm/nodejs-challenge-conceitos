# Requisição do sistema

## Rotas

`POST "/users"`

- [x] Deve ser possível cadastrar o usuário recebendo o **name** e o **username**.
- [x] Cada usuário **deve** conter:

  ```javascript
  {
    id: 'uuid', // precisa ser um uuid
    name: 'Danilo Vieira',
    username: 'danilo',
    todos: []
  }
  ```

- [x] O objeto usuário deve ser retornado na resposta da requisição com o status `201`.

`GET "/todos"`

- [x] Deve receber no header da requisição o **username** do usuário.
- [x] Deve retornar todas as todos do usuário.

`POST "/todos"`

- [x] Deve receber no header da requisição o **username** do usuário.
- [x] Deve receber **title** e **deadline**.
- [x] Deve ser possível adicionar uma nova todo na lista do usuário.
- [x] As todos devem seguir a seguinte estrutura:

  ```javascript
  {
    id: 'uuid', // precisa ser um uuid
    title: 'Nome da tarefa',
    done: false,
    deadline: '2021-02-27T00:00:00.000Z',
    created_at: '2021-02-22T00:00:00.000Z'
  }
  ```

- [x] O objeto todo deve ser retornado na resposta da requisição.

`PUT "/todos/:id"`

- [x] Deve receber no header da requisição o **username** do usuário.
- [x] Deve ser possível alterar o **title** e a **deadline** da todo.

`PATCH "/todos/:id/done"`

- [x] Deve receber no header da requisição o **username** do usuário.
- [x] Deve ser possível alterar o **done** da **todo** para true.

`DELETE "/todos/:id"`

- [x] Deve receber no header da requisição o **username** do usuário.
- [x] Deve ser capaz de excluí a **todo** pelo **id** passado no parâmetro da rota.

`Middleware`

- [x] Deve conter o seguinte nome: `checkExistsUserAccount`.
- [x] Deve adicionar usuário, caso exista, dentro do request.
- [x] Deve retornar status code `404` e um json, caso não exista o usuário.

## Regras de negócio

- [x] Não deve ser possível atualizar uma **todo** com **id** diferente ou inexistente.
- [x] Toda **todo** deve iniciar com o **done** sempre como **false**.
- [x] Não deve ser possível criar um usário com username já existente:
      return => (status code: `400`, json({ error: 'Mensagem de erro' }))
- [x] Não deve ser possível atualizar uma todo que não exista.
      return => (status code: `404`, json({ error: 'Mensagem de erro' }))
- [x] Não deve ser possível aterar **done** para `true` em uma todo que não exista.
      return => (status code: `404`, json({ error: 'Mensagem de erro' }))
- [x] Não deve ser possível deletar uma todo que não exista.
      return => (status code: `404`, json({ error: 'Mensagem de erro' }))
