const Lesson = require('../../models/lesson');
const axios = require('axios');
/**
 * Lesson
 * @param {Request} req 
 * @param {Request} res 
 */
const lessonAPI = async (req, res) => {
   const courseId = String(req.params.courseId);
   const lessonsResponse = await axios.get(`http://localhost:3000/api/courses/${courseId}/lessons`);
   const lessonsData = lessonsResponse.data;
   console.log(lessonsData.meta.code);
   console.log(lessonsData);
   const lessonId = String(req.params.lessonId);
   const lessonsID = [...lessonsData.data.lessons];
   if (parseInt(lessonsData.meta.code) != 200) {
      res.send({
         "data": null,
         "meta": {
            'code': 404,
            'message': 'Course not found'
         }
      });
   } else {
      
      if (lessonsID.includes(lessonId) == true) {
         const lesson = await Lesson.findById(lessonId).exec();
         res.send({
            "data": lesson,
            "meta": {
               'code': 200,
               'message': 'OK'
            }
         });
      } else {
         // console.log(lessonsID);
         // console.log(lessonId);
         res.send({
            "data": null,
            "meta": {
               'code': 404,
               'message': 'Lesson not found'
            }
         });
      }
   }
}
module.exports = lessonAPI;