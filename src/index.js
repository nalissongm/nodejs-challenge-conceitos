const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }

  request.user = user;
  return next();
}

function checksExitsTodo(request, response, next) {
  const { todos } = request.user;
  const { id } = request.params;

  const todo = todos.some((todo) => todo.id === id);

  if (!todo) {
    return response.status(404).json({ error: "Todo not found" });
  }

  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;
  const checkIfUsernameExists = users.some(
    (user) => user.username === username
  );

  if (!name && !username) {
    return response
      .status(404)
      .json({ error: "Name and Username are required." });
  }

  if (checkIfUsernameExists) {
    return response.status(404).json({ error: "Username already exists." });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(user);

  return response.status(201).json({ user });
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { todos } = request.user;

  return response.json({ todos });
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(todo);

  return response.status(201).json({ todo });
});

app.put(
  "/todos/:id",
  checksExistsUserAccount,
  checksExitsTodo,
  (request, response) => {
    const { title, deadline } = request.body;
    const { id } = request.params;
    const { todos } = request.user;

    const todo = todos.find((todo) => todo.id === id);

    todo.title = title;
    todo.deadline = new Date(deadline);

    return response.status(200).send();
  }
);

app.patch(
  "/todos/:id/done",
  checksExistsUserAccount,
  checksExitsTodo,
  (request, response) => {
    const { id } = request.params;
    const { todos } = request.user;

    const todo = todos.find((todo) => todo.id === id);

    todo.done = true;

    return response.status(200).send();
  }
);

app.delete(
  "/todos/:id",
  checksExistsUserAccount,
  checksExitsTodo,
  (request, response) => {
    const { id } = request.params;
    const { todos } = request.user;

    const todo = todos.find((todo) => todo.id === id);

    todos.splice(todo, 1);

    return response.status(200).send();
  }
);

module.exports = app;
