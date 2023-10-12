/**
 * Lessons
 * @param {Request} req 
 * @param {Request} res 
 */
const lessons = (req, res) => {
   // req.params.courseId
   res.send({
      "Route": "lessons"
   });
}
module.exports = lessons;