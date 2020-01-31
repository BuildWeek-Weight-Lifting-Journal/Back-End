const db = require('../../data/dbConfig')

function find() {
    return db('journal')
}

function findBy(filter) {
    return db('journal').where(filter)
}

function findById(id) {
    return db('journal').where({ id }).first()
}

async function add(user) {
    const [id] = await db('journal').insert(user)
    return findById(id)
}

function remove(id) {
    return db('journal').where({ id }).del()
}


module.exports = {
    find,
    findBy,
    findById,
    add,
    remove
}