
exports.up = async function(knex) {
  await knex.schema.createTable('user', (table) => {
      table.increments('id')
      table.string('first_name', 50)
        .notNullable()
      table.string('last_name', 50)
        .notNullable()
      table.float('age')
        .notNullable()
      table.string('username', 128)
        .notNullable()
        .unique()
      table.string('password')
        .notNullable()     
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExist('user')
};
