const { default: axios } = require("axios");
const BaseResponse = require("../../utils/baseResponse");

/**
 * Languages
 * @param {Request} req 
 * @param {Request} res 
 */
const languages = async (req, res) => {
   const courseResponse = await axios.get(`http://localhost:3000/api/courses`);
   const coursesData = courseResponse.data.data;
   const langs = new Set();
   for (let i = 0; i < coursesData.length; i++) {
      const courseId = String(coursesData[i].courseID);
      const lang = courseId.split('-');
      langs.add(lang[1]);
   }
   res.send(BaseResponse.ofSucceed([...langs]));
}
module.exports = languages;