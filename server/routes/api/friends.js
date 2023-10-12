/**
 * Friends
 * @param {Request} req 
 * @param {Request} res 
 */
const friends = (req, res) => {
   res.send({
      "Route": "friends"
   });
}
module.exports = friends;