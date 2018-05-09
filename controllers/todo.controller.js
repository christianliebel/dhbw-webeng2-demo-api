const TodoRepository = require('../repositories/todo.repository');
const todoRepository = new TodoRepository();
const Todo = require('../models/todo');
const errs = require('restify-errors');
let todoId = 0;

module.exports = server => {
    server.get('/todos', (req, res) => {
        res.send(todoRepository.getAll());
    });

    server.get('/todos/:id', (req, res) => {
        const todo = todoRepository.get(req.params.id);
        res.send(todo ? todo : new errs.NotFoundError(`Datensatz mit der ID ${req.params.id} nicht gefunden.`))
    });

    server.post('/todos', (req, res) => {
        const todo = new Todo(todoId++, req.body.name, req.body.done);
        todoRepository.createOrUpdate(todo);
        res.send(201, todo);
    });

    server.put('/todos/:id', (req, res) => {
        const todo = new Todo(+req.params.id, req.body.name, req.body.done);
        todoRepository.createOrUpdate(todo);
        res.send(204);
    });

    server.del('/todos/:id', (req, res) => {
        todoRepository.delete(+req.params.id);
        res.send(204);
    });
};
