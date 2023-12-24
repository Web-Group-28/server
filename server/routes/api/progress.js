const History = require("../../models/history");
const BaseResponse = require("../../utils/baseResponse");

/**
 * User progress
 * @param {Request} req 
 * @param {Request} res 
 */
const progress = async (req, res) => {
   const history = await History.findOne({
      userID: req.params.userID,
      courseID: req.params.courseID
   }).exec();
   if (history == null) {
      res.send(BaseResponse.ofSucceed(null));
   } else {
      res.send(BaseResponse.ofSucceed(history.lessonID));
   }
}
module.exports = progress;