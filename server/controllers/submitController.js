const { default: mongoose } = require('mongoose');
const History = require('../models/history');
const BaseResponse = require('../utils/baseResponse');

class SubmitController {
   async submit(req, res) {
      const courseId = String(req.params.courseId);
      const lessonId = String(req.params.lessonId);
      const userID = String(req.session.user);
      const userHistory = await History.findOne({
         userID: userID,
         courseID: courseId
      }).exec();
      if (userHistory == null) {
         console.log(courseId);
         const newHistory = new History({
            userID: new mongoose.Types.ObjectId(userID),
            courseID: courseId,
            lessonID: [new mongoose.Types.ObjectId(lessonId)]
         });
         newHistory.save().then(console.log(`HISTORY CREATED:${newHistory._id}`));
      }
      else {
         console.log(userHistory);
         userHistory.lessonID.addToSet(new mongoose.Types.ObjectId(lessonId));
         userHistory.save().then(console.log(`SUBMITTED: ${userHistory._id}`))
      }
      res.send(BaseResponse.ofSucceed(null));
   }
}
module.exports = new SubmitController();