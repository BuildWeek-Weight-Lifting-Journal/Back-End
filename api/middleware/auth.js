const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets')


const authenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, secrets.jwtsecret, (err, decodedToken) => {
      if (err) {
        // console.log(err)
        res.status(401).json({message: "Unauthorized"})
      } else {       
        next();
      }
    })
  } else {
    res.status(401).json({message: 'Must be logged in'})
  }
}

module.exports = authenticated