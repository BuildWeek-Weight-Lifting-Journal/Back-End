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



const port = process.env.PORT || 5000


server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter); 
server.use('/api/users', usersRouter)
server.use('/api/exercises', exerciseRouter);
server.use('/api/journals', journalRouter);
server.use('/api/jouexe', jouexeRouter);

server.get('/', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/9002882/SWTEdwUH?version=latest')
    
})



server.listen(port, () => console.log(`Server is running at port: ${port}`))