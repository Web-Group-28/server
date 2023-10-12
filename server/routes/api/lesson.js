/**
 * Lesson
 * @param {Request} req 
 * @param {Request} res 
 */
const lesson = (req, res) => {
   // req.params.courseId
   // req.params.lessonId
   res.send({
      "Route": "lesson"
   });
}
module.exports = lesson;