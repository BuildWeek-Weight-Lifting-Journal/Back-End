const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')

require('dotenv').config()
const server = express()

const authRouter = require('./api/auth/auth-router');
const usersRouter = require('./api/user/user-route');
const exerciseRouter = require('./api/excersies/exercises-router');
const journalRouter = require('./api/journals/journal-router');
const jouexeRouter = require('./api/journalsExcersise/je-router')
const auth = require('./api/auth/auth-router')


const port = process.env.PORT || 5000


server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth',  authRouter); 
server.use('/api/users', auth, usersRouter)
server.use('/api/exercises', auth, exerciseRouter);
server.use('/api/journals', auth, journalRouter);
server.use('/api/jouexe', auth, jouexeRouter);

server.get('/', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/9002882/SWTEdwUH?version=latest')
    
})


if (!module.parent) {
    server.listen(port, () => {
        console.log(`Server is running at port: ${port}`)
    })
}
