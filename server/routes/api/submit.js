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
   const learnedIDs = (await History.findOne({
      userID: userID
   }).exec()).learnedID;
   for (let i = 0; i < learnedIDs.length; i++) {
      const tmpID = learnedIDs[i].courseID.toString();
      if (tmpID == courseId) {
         const lessonsID = new Set(learnedIDs[i].lessonID);
         lessonsID.add(mongoose.Types.ObjectId(lessonId));
         break;
      }
   }
   res.send({
      "Route": "submit"
   });
}
module.exports = submit;