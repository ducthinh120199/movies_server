const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}

User.init({
  // định nghĩa các thuộc tính của mô hình User
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER
  },
  token: {
    type: DataTypes.STRING
  },
  facebookId: {
    type: DataTypes.STRING
  },
  facebookAccessToken: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'user',
});

module.exports = User;