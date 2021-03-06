const db = require('../../data/dbConfig');

module.exports = {
    add,
    find,
    findById,
    findByUserId,
    findExerciseByJournalByUserId,
    update,
    remove
}

function find() {
    return db('journals')
    .select('id', 'name', 'date', 'userId');
}

function findById(id) {
    return db('journals')
    .select('id', 'name', 'date', 'userId')
    .where({id})
    .first();
}

function findByUserId(userId) {
    return db('journals')
    .join('users', 'users.id', 'journals.userId')
    .where('journals.userId', userId)
    .select('journals.*')
}

function findExerciseByJournalByUserId(id, userId) {
    return db('journalsExercises')
    .join('journals', 'journals.id', 'journalsExercises.journalId')
    .where('journalsExercises.journalId', id)
    .join('users', 'users.id', 'journals.userId')
    .where('journals.userid', userId)
    .join('exercises', 'exercises.id', 'journalsExercises.exerciseId')
    .select('journalsExercises.*', 'exercises.name')
}

function add(journal) {
    return db('journals')
    .insert(journal)
    .returning('*')
}

function update(id, changes) {
    return db('journals')
    .where('id', id)
    .update(changes)
    .returning('*')
}

function remove(id) {
    return db('journals')
    .where({id})
    .delete();
}