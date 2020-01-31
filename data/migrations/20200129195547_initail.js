
exports.up = async function(knex) {
    //create user
  await knex.schema.createTable('users', (table) => {
      table.increments('id')
      table.string('email')
        .notNullable()
        .unique()
      table.string('first_name', 50)
        .notNullable()
      table.string('last_name', 50)
        .notNullable()
      table.integer('age')
        .notNullable()
      table.string('username', 128)
        .notNullable()
        .unique()    
      table.string('password')
        .notNullable()
    
  })
  //create workout table
  await knex.schema.createTable('workouts', (table) => {
    table.increments('id')
    table.date('date')
    table.string('upper_body')
    table.string('lower_body')
    table.string('core')
    table.integer('users_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
  })
  //create journal
  await knex.schema.createTable('journal', (table) => {
    table.increments('id')
    table.string('notes')
    table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
  })
 

};

exports.down = async function(knex) {  
  await knex.schema.dropTableIfExists('journal')
  await knex.schema.dropTableIfExists('workouts')
  await knex.schema.dropTableIfExists('users')
};
