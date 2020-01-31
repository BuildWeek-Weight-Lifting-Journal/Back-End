
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
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('user')
};
