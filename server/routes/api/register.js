/**
 * Register authentication
 * @param {Request} req 
 * @param {Request} res 
 */
const register = (req, res) => {
   res.send({
      "Route": 'Register'
   });
}
module.exports = register;