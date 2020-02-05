const db = require('../../data/dbConfig');

module.exports = {
    add,
    find,
    findByRegion,
    findById,
    update,
    remove
}

function find() {
    return db('exercises')
    .select('*');
}

function findByRegion(region) {
    return db('exercises')
    .select('name')
    .where({region});
}

function findById(id) {
    return db('exercises')
    .select('name', 'region')
    .where({id})
    .first();
}

function add(exercise) {
    return db('exercises')
    .insert(exercise)
    .returning('*')
        .first();
    
}

function update(id, changes) {
    return db('exercises')
    .where('id', id)
    .update(changes)
    .returning('*')
        .first();
    
}

function remove(id) {
    return db('exercises')
    .where({id})
    .delete();
}