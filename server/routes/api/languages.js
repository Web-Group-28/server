/**
 * Languages
 * @param {Request} req 
 * @param {Request} res 
 */
const languages = (req, res) => {
   res.send({
      "Route": "languages"
   });
}
module.exports = languages;