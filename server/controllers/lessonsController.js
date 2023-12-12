const lessonsAPI = require('../middlewares/lessons');
class LessonsController {
   async lessons(req, res) {
      res.send(await lessonsAPI(req.params.courseId));
   }
}
module.exports = new LessonsController();