const knex = require('knex')('production');

const knexConfig = require('../knexfile.js');
const enviornment = process.env.DB_ENV || "dev"

module.exports = knex(knexConfig[enviornment]);