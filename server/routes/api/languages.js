const BaseResponse = require("../../utils/baseResponse");
const Course = require("../../models/course");

/**
 * Languages
 * @param {Request} req 
 * @param {Request} res 
 */
const languages = async (req, res) => {
   const coursesData = await Course.find({}).exec();
   const langs = new Set();
   for (let i = 0; i < coursesData.length; i++) {
      const courseId = String(coursesData[i].courseID);
      const lang = courseId.split('-');
      langs.add(lang[1]);
   }
   res.send(BaseResponse.ofSucceed([...langs]));
}
module.exports = languages;