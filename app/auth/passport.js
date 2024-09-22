const passportJWT = require('passport-jwt');
// const JwtStrategy = passportJWT.JwtStrategy;
// const ExtractJwt = passportJWT.ExtractJwt;
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./User')

// Passport JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "сертрентный ключ", // Замените на свой секртеный ключь
  };
  
  passport.use(new JwtStrategy(jwtOptions, async(jwtPayload, done) => {
    // Здесь вы можете выполнить проверку пользователя в базе данных или в доугом источнике данных
    // и вызывать функцию done с аргументом, указывающим успещность утентификации 
    // done(null, user) - успешная аутентификация
    // done(null, false) - неуспешная аутентификация
    const user = await User.findByPk(jwtPayload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }));

module.exports = {
    jwtOptions
}


// const user = await User.find(user => user.id === jwtPayload.sub);
// if (user) {
//   return done(null, user);
// } else {
//   return done(null, false);
// }
// }));