// this middleware also check if the user is login but uses token
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'secret is set in env'

module.exports = (req, res, next) => {
    //this will look for a token
    if (token) {
        //rehash the header, payload and the secret and see if it matches our verify signature
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            // we are now checking to see the error
            if (err) {
                console.log(err.message)
                res.status(401).json({
                    message: 'Sorry you can not move forward'
                })
            } else {
                //if token is valid
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.status(401).json({
            message: 'You are missing your tokens'
        })
    } 
}

function fetchtoken() {
    
}