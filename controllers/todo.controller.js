const TodoRepository = require('../repositories/todo.repository');
const todoRepository = new TodoRepository();
const Todo = require('../models/todo');
const errs = require('restify-errors');
let todoId = 0;

module.exports = server => {
    server.get('/todos', (req, res) => {
        res.send(todoRepository.getAll(req.user.sub));
    });

    server.get('/todos/:id', (req, res) => {
        const todo = todoRepository.get(req.user.sub, +req.params.id);
        res.send(todo ? todo : new errs.NotFoundError(`Datensatz mit der ID ${req.params.id} nicht gefunden.`))
    });

    server.post('/todos', (req, res) => {
        if (!req.body.name)
            return res.send(new errs.BadRequestError('No name for new item supplied.'));

        if (typeof req.body.name !== 'string')
            return res.send(new errs.BadRequestError('name should be a string.'));
        if (req.body.done !== void 0 && typeof req.body.done !== 'boolean')
            return res.send(new errs.BadRequestError('done should be a boolean.'));

        const todo = new Todo(todoId++, req.body.name, req.body.done || false);
        todoRepository.createOrUpdate(req.user.sub, todo);
        res.send(201, todo);
    });

    server.put('/todos/:id', (req, res) => {
        if (!req.body.name)
            return res.send(new errs.BadRequestError('No name for item supplied.'));
        if (req.body.done === void 0)
            return res.send(new errs.BadRequestError('No done flag for item supplied.'));

        if (typeof req.body.name !== 'string')
            return res.send(new errs.BadRequestError('name should be a string.'));
        if (typeof req.body.done !== 'boolean')
            return res.send(new errs.BadRequestError('done should be a boolean.'));

        const todo = new Todo(+req.params.id, req.body.name, req.body.done);
        todoRepository.createOrUpdate(req.user.sub, todo);
        res.send(204);
    });

    server.del('/todos/:id', (req, res) => {
        todoRepository.delete(req.user.sub, +req.params.id);
        res.send(204);
    });
};
