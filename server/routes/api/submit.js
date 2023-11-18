/**
 * Submit
 * @param {Request} req 
 * @param {Request} res 
 */
const submit = (req, res) => {
   const courseId = req.params.courseId;
   const lessonId = req.params.lessonId;
   
   res.send({
      "Route": "submit"
   });
}
module.exports = submit;