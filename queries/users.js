const user = require('../models/users');

const getUserById = async (userId) => {
  return await user.findByPk(userId);
};

const getUserByEmail = async (email) => {
  return await user.findOne({
    where: {
      email
    }
  });
};

const createUser = async (userData) => {
  return await user.create(userData)
}

module.exports = {
  getUserById,
  createUser,
  getUserByEmail
};