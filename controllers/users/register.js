
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { createUser, getUserByEmail } = require('../../queries/users');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    let hasUser = await getUserByEmail(email);
    if (hasUser) {
      res.status(400).send({ error: true, message: "Email exits!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashPassword });

    const payload = { userId: user.id, email: user.email };
    const secretKey = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: '1h' };

    const token = jwt.sign(payload, secretKey, options);
    res.json({
      success: {
        message: "Authentication success!"
      },
      body: {
        access_token: token,
        token_type: "Bearer",
        expires_in: options.expiresIn
      }
    })
  } catch (err) {
    res.status(400).send({ error: true, message: err });
  }
}

module.exports = {
  registerUser
}