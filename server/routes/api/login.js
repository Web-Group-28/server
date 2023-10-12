/**
 * Login authentication
 * @param {Request} req 
 * @param {Request} res 
 */
const login = (req, res) => {
   const username = req.body.username;
   const password = req.body.password;
   res.send({
      "Username": username,
      "Password": password,
      "Route": "Login"
   });
}
module.exports = login;