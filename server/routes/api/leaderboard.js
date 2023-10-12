/**
 * Leaderboard
 * @param {Request} req 
 * @param {Request} res 
 */
const leaderboard = (req, res) => {
   res.send({
      "Route": 'leaderboard'
   });
}
module.exports = leaderboard;