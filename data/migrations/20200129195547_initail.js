
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
    table.increments()
    table.date('date')
    table.string('upper_body')
    table.string('lower_body')
    table.string('cor')
  })
  //create journal
  await knex.schema.createTable('journal', (table) => {
    table.increments()
    table.string('notes')
  })

};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('notes')
  await knex.schema.dropTableIfExists('workouts')
  await knex.schema.dropTableIfExists('users')
};
