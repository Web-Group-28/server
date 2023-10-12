/**
 * Courses
 * @param {Request} req 
 * @param {Request} res 
 */
const courses = (req, res) => {
   res.send({
      "Route": "courses"
   });
}
module.exports = courses;