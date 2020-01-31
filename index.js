const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const session = require('express-session')
const connectSessionKnex = require('connect-session-knex')
require('dotenv').config()
const server = express()
const db = require('./data/dbConfig')

const authenticate = require('./api/middleware/authenticate')
const authRouter = require('./api/auth/auth-model')
const port = process.env.PORT || 5000

const knexSessionsStore = connectSessionKnex(session)

const sessionConfig = {
    name: 'weightLifter',
    secret: 'Keep it secret, Keep this safe',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
    store: new knexSessionsStore({
        knex: db,
        tablename: 'sessions',
        sidfieldname: true,
        clearInterval: 60 * 6000
    })
}
server.use(helmet())
server.use(cors())
server.use(morgan('dev'))
server.use(session(sessionConfig))
server.use(express.json())

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/../index.html'))
})

server.listen(port, () => console.log(`Server is running at port: ${port}`))