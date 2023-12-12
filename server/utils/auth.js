const bcrypt = require("bcrypt");

class AuthUtils{
  static hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });
    });
  };

  static comparePassword(password, hashed) {
    return bcrypt.compare(password, hashed); // boolean
  };

}

module.exports = AuthUtils;
