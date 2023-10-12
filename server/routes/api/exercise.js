/**
 * Exercise
 * @param {Request} req 
 * @param {Request} res 
 */
const exercise = (req, res) => {
   // req.params.courseId
   // req.params.lessonId
   // req.params.exerciseId
   res.send({
      "Route": "exercise"
   });
}
module.exports = exercise;