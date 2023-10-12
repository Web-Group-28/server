/**
 * Submit
 * @param {Request} req 
 * @param {Request} res 
 */
const submit = (req, res) => {
   // req.params.courseId
   // req.params.lessonId
   // req.params.exerciseId
   res.send({
      "Route": "submit"
   });
}
module.exports = submit;