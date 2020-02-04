const express = require('express')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../auth/generateToken')
const userModel = require('../user/user-model')
const router = express.Router()

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

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await userModel.findBy({ username }).first()
    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {
      const token = generateToken(user);
      res.status(200).json({ 
        message: `Welcome, ${user.username}!`, token})
    } else {
      res.status(401).json({ message: "Please try to login again!"})
    }
  } catch (error) {
    next(error)
  }
})


module.exports = router;
