const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')

require('dotenv').config()
const server = express()

const userRouter = require('./api/user/user-route')
const authRouter = require('./api/auth/auth-router')
const auth = require('./api/middleware/auth')
const port = process.env.PORT || 5000


server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/users', auth, userRouter)

server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'))
    
})



server.listen(port, () => console.log(`Server is running at port: ${port}`))