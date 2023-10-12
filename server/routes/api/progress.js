/**
 * User progress
 * @param {Request} req 
 * @param {Request} res 
 */
const progress = (req, res) => {
   res.send({
      "Route": "progress"
   });
}
module.exports = progress;