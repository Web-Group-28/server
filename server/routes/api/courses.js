const Course = require("../../models/course");

/**
 * Courses
 * @param {Request} req 
 * @param {Request} res 
 */
const courses = async (_req, res) => {
   const courses = await Course.find({}).exec();
   res.send({
      data: courses,
      meta: {
         code: 200,
         message: 'OK'
      }
   });
}
module.exports = courses;