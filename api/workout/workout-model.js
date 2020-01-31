const db = require('../../data/dbConfig')

function find() {
    return db('workouts')
}

function findBy(filter) {
    return db('workouts').where(filter)
}

function findById(id) {
    return db('workouts').where({ id }).first()
}

async function add(user) {
    const [id] = await db('workouts').insert(user)
    return findById(id)
}

function remove(id) {
    return db('workouts').where({ id }).del()
}


module.exports = {
    find,
    findBy,
    findById,
    add,
    remove
}