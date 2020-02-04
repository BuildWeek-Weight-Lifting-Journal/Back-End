const db = require('../../data/dbConfig')

module.exports = {
    find,
    findBy,
    findById,
    insert,
    update, 
    remove,
    findJournals,
    findJournalById,
    insertJournal,
    updateJournal,
    removeJournal,


};

function find() {
    return db('users');
};

function findBy(filter) {
    return db('users').where(filter)
    
};

function findById(id) {
    return db('users')
        .where({id})
        .first();
};

function insert(user) {
    return db('users')
        .insert(user, 'id')
        .returning('*')
};

function update(user, id) {
    return db('users')
        .where({id})
        .update(user)
        .returning('*')
};

function remove(id) {
    return db('users')
        .where({id})
        .del();
};

function findJournals(usersId) {
    return db('journals')
        .where({users_id: usersId})
};

function findJournalById(id) {
    return db('journals')
        .where({id: id})
        .first()
};

function insertJournal(Journal) {
    return db('journals')
        .insert(Journal,'id')
        .returning('*')
       
};

function updateJournal(Journal, id) {
    return db('journals')
        .where({id})
        .update(Journal)
        .returning('*')
        
};

function removeJournal(id) {
    return db('journals')
        .where({id})
        .del();
        
};