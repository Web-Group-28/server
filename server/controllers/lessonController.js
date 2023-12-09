const lessonAPI = require('../middlewares/lesson');
class LessonController {
   async lesson(req, res) {
      const courseId = String(req.params.courseId);
      const lessonId = String(req.params.lessonId);
      res.send(await lessonAPI(courseId, lessonId));
   }
}
module.exports = new LessonController();