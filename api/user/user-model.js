const db = require('../../data/dbConfig')

module.exports = {
    find,
    findByEmail,
    findById,
    insert,
    update, 
    remove,
    findWorkouts,
    findWorkoutById,
    insertWorkout,
    updateWorkout,
    removeWorkout,


};

function find() {
    return db('users');
};

function findByEmail(email) {
    return db('users')
        .where({email: email})
        .first();
};

function findById(id) {
    return db('users')
        .where({id})
        .first();
};

function insert(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => findById(id))
};

function update(user, id) {
    return db('users')
        .where({id})
        .update(user)
        .then(count => {
            if(count > 0) {
                return findById(id)
            }
        });
};

function remove(id) {
    return db('users')
        .where({id})
        .del();
};

function findWorkouts(usersId) {
    return db('workouts')
        .where({users_id: usersId})
};

function findWorkoutById(id) {
    return db('workouts')
        .where({id: id})
        .first()
};

function insertWorkout(workout) {
    return db('workouts')
        .insert(workout,'id')
        .then(([id]) => {
            return findWorkoutById(id)
        })
       
};

function updateWorkout(workout, id) {
    return db('workouts')
        .where({id})
        .update(workout)
        .then(count => {
            return count
        })
        
};

function removeWorkout(id) {
    return db('workouts')
        .where({id})
        .del();
        
};