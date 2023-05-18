const bcrypt = require('bcrypt');
require('dotenv').config();
const { createUser, getUserByEmail } = require('../queries/users');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    let hasUser = await getUserByEmail(email);
    if (hasUser) {
      res.status(400).send({ 
        error: {
          message: "Email exits!"
        } 
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashPassword});

    res.status(200).send({
      success: {
        message: "Register success!"
      },
      body: {
        user: user
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: true, message: "Internal server error!" });
  }
}

module.exports = {
  registerUser
}