module.exports = {

  dev: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/weight.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/test_weight.db3'
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
},

staging: {
  client: 'pg',
  connection: {
    filename: './data/weight.db3'
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    },
  },
  migrations : {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  },
},

production: {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations : {
    directory: './data/migrations',
    tableName: 'dbmigrations',
  },
  seeds: {
    directory: './data/seeds'
  },
}
}