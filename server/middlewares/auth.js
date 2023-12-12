const { expressjwt: jwt } = require("express-jwt");

const requireSignin = jwt({
    getToken: (req, res) => req.cookies.token,
    secret: "HJKAHFKJ4O930909JEJR998392J0R9H89438RH3490R043",
    algorithms: ["HS256"],
  });

module.exports = requireSignin;

