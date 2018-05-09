module.exports = class TodoRepository {
    constructor() {
        this._userStores = new Map();
    }

    getAll(user) {
        return Array.from(this._getStore(user).values());
    }

    get(user, id) {
        return this._getStore(user).get(id);
    }

    createOrUpdate(user, todo) {
        this._getStore(user).set(todo.id, todo);
    }

    delete(user, id) {
        this._getStore(user).delete(id);
    }

    _getStore(user) {
        let store = this._userStores.get(user);
        if (!store) {
            store = new Map();
            this._userStores.set(user, store);
        }

        return store;
    }
};
