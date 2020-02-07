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
    .returning('*')
}

// function update(id, changes) {
//     return db('users')
//     .where('id', id)
//     .update(changes)
//     .returning('*')
// }

async function update(changes, id) {
    const results = await db('users').where({ id }).update(changes);
    return findById(id);
  }

function remove(id) {
    return db('users')
    .where({id})
    .delete()
}