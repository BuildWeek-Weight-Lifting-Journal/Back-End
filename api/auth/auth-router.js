const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../user/user-model')

const generateToken = user => {
  const payload = {
    sub: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '5m',
  }
  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

router.post('/register', async (req, res) => {
  // implement registration  
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 12)
  user.password = hash
console.log(req.body)
  try {
    const registered = await userModel.insert(user)    
    registered ? res.status(201).json(registered) : res.status(404)
  } catch(err) {
    res.status(500).json({ error: err.message})

  }
});

router.post('/login', async (req, res) => {
  // implement login
  let { username, password } = req.body;
  try {
    const login = await userModel.findBy({ username }).first()
    
    if (login && bcrypt.compareSync(password, login.password)) {
      const token = generateToken(login)
      res.status(200).json({
        message: `Welcome ${login.username}!`,
        token 
      })
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({
      error: err.message
    })
  }
});

module.exports = router;
