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

app.get('/', (req, res) => {
  res.json({
    message: 'Server OK',
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