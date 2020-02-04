const db = require('../../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
}

function find() {
    return db('users')
    .select();
}

function findBy(filter) {
    return db('users')
    .where(filter);
}

function findById(id) {
    return db('users')
    .select('id', 'username', 'email', 'firstName', 'lastName')
    .where({id})
    .first();
}

function add(user) {
    return db('users')
    .insert(user)
    .then(ids => {
        const [id] = ids; 
        return db('users')
        .select('id', 'username', 'email', 'firstName', 'lastName')
        .where({id})
        .first();
    })
}

function update(id, changes) {
    return db('users')
    .where('id', id)
    .update(changes)
    .then(ids => {
        const [id] = ids;
        return db('users')
        .where({id})
        .first();
    })
}

function remove(id) {
    return db('users')
    .where({id})
    .delete()
}