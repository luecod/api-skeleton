const express = require("express")
const cors = require('cors')
require('dotenv').config()

const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')

const db = require('./utils/database')
const app = express()

const PORT = process.env.PORT || 9000



//? Validar la conexión 
db.authenticate()
  .then(() => console.log('Database Authenticated!'))
  .catch(err => console.log(err))

db.sync()
  .then(() => console.log('Database Synced!'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(cors())

const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} | ${req.path}`)
  // req.message = 'Hola desde el middleware'
  // next()
  if (req.method !== 'DELETE') {
    // req.message = 'Hola desde el middleware'
    next()
    return
  } else {
    res.status(400).json({ message: 'No elimines' })
  }
}

// app.use(loggerMiddleware) //? Middleware global

app.get('/', loggerMiddleware, (req, res) => {
  res.json({
    message: 'Server OK',
    myMessage: req.message,
    // myMessage: process.env.MESSAGE,
    // myPort: process.env.PORT
  })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)


app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})




// const express = require('express')
// const cors = require('cors')


// const app = express()

// app.use(express.json())

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Server ok!' })
// })

// app.listen(9000, () => {
//   console.log('Server started at port 9000')
// })