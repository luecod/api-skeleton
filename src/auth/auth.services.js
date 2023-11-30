const checkUserCredentials = require('./auth.controllers')
const jwt = require('jsonwebtoken')

const postLogin = (req, res) => {
  const { email, password } = req.body
  checkUserCredentials(email, password)
    .then(data => {
      if (!data) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
      const token = jwt.sign({
        id: data.id,
        role: data.role,
        firstName: data.firstName,
        lastName: data.lastName,
        // email: data.email
      }, 'Alt4irTesis', { expiresIn: '10h' })
      return res.status(200).json(token)
      // return res.status(200).json(data)
    })
    .catch(err => res.status(400).json({ err }))
}

module.exports = postLogin
