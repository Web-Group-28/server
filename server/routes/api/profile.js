/**
 * User profile
 * @param {Request} req 
 * @param {Request} res 
 */
const profile = (req, res) => {
   res.send({
      "Route": "profile"
   });
}
module.exports = profile;