/**
 * Exercises
 * @param {Request} req 
 * @param {Request} res 
 */
const exercises = (req, res) => {
   // req.params.courseId
   // req.params.lessonId
   res.send({
      "Route": "exercises"
   });
}
module.exports = exercises;