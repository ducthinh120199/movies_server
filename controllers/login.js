require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('../middlewares/passport');

// Route đăng nhập
const loginUser = async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send({ message: info.message });
      }
  
      // Tạo token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
  
      // Lưu thông tin session vào `req.session`
      req.session.token = token;
      req.session.expires = process.env.EXPIRES_IN;
  
      // Gửi kết quả trả về
      return res.status(200).send({
        success: {
          message: "Authentication success!"
        },
        body: {
          token: req.session.token,
          expires: req.session.expires
        }
      })
    })(req, res, next);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: true, message: "Internal server error!" });
  }
}

module.exports = {
  loginUser
}