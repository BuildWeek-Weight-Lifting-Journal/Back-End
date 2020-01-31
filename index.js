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

const KnexSessionStore = connectSessionKnex(session)

const sessionConfig = {
    name: "weightlifterjournal",
    secret: 'keep it secret, keep it safe',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000, // days * hours * minutes * seconds * milliseconds
      secure: false, // true, (in production set to true) // only set cookies over https. Server will not send back a cookie over http.
      httpOnly: true, // browser can't access via js
    }, // 1 day in milliseconds // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: true, // GDPR laws against setting cookies automatically
    // store the session
    store: new KnexSessionStore({
    //   knex: db,
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 60 * 60000
    })
  }
server.use(helmet())
server.use(cors())
server.use(morgan('dev'))
server.use(session(sessionConfig))
server.use(express.json())

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'))
})

server.use('/api/auth', authRouter)

server.listen(port, () => console.log(`Server is running at port: ${port}`))