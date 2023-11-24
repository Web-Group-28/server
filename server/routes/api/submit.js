const { default: mongoose } = require('mongoose');
const History = require('../../models/history');
const { default: axios } = require('axios');

/**
 * Get user id in the current session
 * @returns
 */
async function getUserID() {
   const session = await axios.get('http://localhost:3000/api/session');
   return session.data.userID;
}


/**
 * Submit
 * @param {Request} req 
 * @param {Request} res 
 */
const submit = async (req, res) => {
   const courseId = String(req.params.courseId);
   const lessonId = String(req.params.lessonId);
   const userID = await getUserID();
   var userHistory = await History.findOne({
      userID: userID,
      courseID: courseId
   }).exec();
   if (userHistory == null) {
      console.log(courseId);
      const newHistory = new History({
         userID: userID,
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
   res.send({
      "data": null
   });
}
module.exports = submit;