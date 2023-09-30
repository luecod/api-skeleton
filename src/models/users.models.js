const { DataTypes } = require('sequelize');
const db = require('../utils/database')

const Users = db.define('users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255]
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 255]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [5, 255],
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: { type: DataTypes.DATEONLY },
  phone: { type: DataTypes.STRING },
  role: {
    type: DataTypes.ENUM('vendedor', 'supervisor', 'administrador'),
    defaultValue: 'vendedor'
  }
  //   avatar: DataTypes.STRING,
  //   created_at: DataTypes.DATE,
  //   updated_at: DataTypes.DATE,
  //   deleted_at: DataTypes.DATE,
  // }, {
  //   timestamps: false,
  //   underscored: true,
})

module.exports = Users
