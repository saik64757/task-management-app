const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    const user = {
      id: payload._id,
      email: payload.email,
    };

    const secret = process.env.SECRET_KEY;
    const option = {
      expiresIn: "7d",
    };

    jwt.sign(user, secret, option, (error, token) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
};

module.exports = generateToken;
