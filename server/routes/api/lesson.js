const Lesson = require('../../models/lesson');
const BaseResponse = require('../../utils/baseResponse');
const lessons = require('./lessons');

/**
 * Helper function
 * @param {String} courseId course ID
 * @param {String} lessonId lesson ID
 * @returns {Promise<{data: any, meta: {code: number}}}
 */
const helper = async (courseId, lessonId) => {
   const lessonsData = await lessons.search(courseId);
   if (lessonsData.meta.code != 200) {
      return BaseResponse.ofError('Course not found', 404)
   } else {
      var found = false;
      for (let i = 0; i < lessonsData.data.length; i++) {
         if (lessonsData.data[i].toString() === lessonId) {
            found = true;
            break;
         }
      }
      if (found) {
         const lesson = await Lesson.findById(lessonId).exec();
         return BaseResponse.ofSucceed(lesson);
      } else {
         return BaseResponse.ofError('Lesson not found', 404);
      }
   }
}

/**
 * Lesson
 * @param {Request} req 
 * @param {Request} res 
 */
const lessonAPI = async (req, res) => {
   const courseId = String(req.params.courseId);
   const lessonId = String(req.params.lessonId);
   res.send(await helper(courseId, lessonId));
}
module.exports = { lessonAPI, helper };