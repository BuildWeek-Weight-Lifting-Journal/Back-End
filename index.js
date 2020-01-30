const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()
const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())

server.get('/', (req, res) => {
    res.send('<h1>Test</h1>')
})

server.listen(port, () => console.log(`Server is running at port: ${port}`))