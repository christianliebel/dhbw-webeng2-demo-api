module.exports = class TodoRepository {
    constructor() {
        this._store = new Map();
    }

    getAll() {
        return Array.from(this._store.values());
    }

    get(id) {
        return this._store.get(id);
    }

    createOrUpdate(todo) {
        this._store.set(todo.id, todo);
    }

    delete(id) {
        this._store.delete(id);
    }
};
