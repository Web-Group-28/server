const Lesson = require('../../models/lesson');
const axios = require('axios');
const BaseResponse = require('../../utils/baseResponse');
/**
 * Lesson
 * @param {Request} req 
 * @param {Request} res 
 */
const lessonAPI = async (req, res) => {
   const courseId = String(req.params.courseId);
   const lessonsResponse = await axios.get(`http://localhost:3000/api/courses/${courseId}/lessons`);
   const lessonsData = lessonsResponse.data;
   // console.log(lessonsData.meta.code);
   // console.log(lessonsData);
   if (parseInt(lessonsData.meta.code) != 200) {
      res.send(BaseResponse.ofError('Course not found', 404))
   } else {
      const lessonId = String(req.params.lessonId);
      const lessonsID = [...lessonsData.data];
      if (lessonsID.includes(lessonId) == true) {
         const lesson = await Lesson.findById(lessonId).exec();
         res.send(BaseResponse.ofSucceed(lesson));
      } else {
         // console.log(lessonsID);
         // console.log(lessonId);
         res.send(BaseResponse.ofError('Lesson not found', 404));
      }
   }
}
module.exports = lessonAPI;