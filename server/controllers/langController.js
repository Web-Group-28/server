const Course = require("../models/course");
const BaseResponse = require("../utils/baseResponse");

class LangController {
   async languages(req, res) {
      const coursesData = await Course.find({}).exec();
      const langs = new Set();
      for (let i = 0; i < coursesData.length; i++) {
         const courseId = String(coursesData[i].courseID);
         const lang = courseId.split('-');
         langs.add(lang[1]);
      }
      res.send(BaseResponse.ofSucceed([...langs]));
   }
}
module.exports = new LangController();