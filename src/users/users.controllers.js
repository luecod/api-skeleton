const Users = require('../models/users.models')
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')

const createNewUser = async (userObj) => {
  const newUser = {
    id: uuid.v4(),
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email,
    password: hashPassword(userObj.password),
    birthday: userObj.birthday,
    phone: userObj.phone
  }
  const data = await Users.create(newUser)
  return data
}

const findAllUsers = async () => {
  const data = await Users.findAll()
  return data
}

const findUserById = async (id) => {
  const data = await Users.findOne({
    where: {
      id: id
    }
  })
  return data
}

const findUserByEmail = async (email) => {
  const data = await Users.findOne({
    where: {
      email: email
    }
  })
  return data
}

const updateUser = async (id, userObj) => {

  const selectedUser = await Users.findOne({
    where: {
      id: id
    }
  })

  if (!selectedUser) return null

  const modifiedUser = await selectedUser.update(userObj)
  return modifiedUser
}

const deleteUser = async (id) => {
  const user = await Users.destroy({
    where: {
      id: id
    }
  })
  return user // 1 || 0
}

module.exports = {
  createNewUser,
  findAllUsers,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser
}




// const { hashPassword, comparePassword } = require('../utils/crypto')