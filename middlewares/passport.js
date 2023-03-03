const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getUserById, getUserByEmail } = require('../queries/users')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Tìm kiếm user trong database
    const user = await getUserByEmail(email);
    const passwordMatches = user && await bcrypt.compareSync(String(password), user.password);

    // Nếu không tìm thấy user hoặc mật khẩu không chính xác, trả về false
    if (!user || !passwordMatches) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    // Nếu tìm thấy user và mật khẩu chính xác, trả về user
    return done(null, user);
  } catch (error) {
    console.log(error);
    return done(error);
  }
}));

// Serialize và deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
}); // khi dang nhap luu user vao session

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});

module.exports = passport;