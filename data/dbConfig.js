const knex = require('knex')
const knexConfig = require('../knexfile')
const enviorement = process.env.NODE_ENV || 'development'

module.exports = knex(knexConfig[enviorement])