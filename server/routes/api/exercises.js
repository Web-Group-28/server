const BaseResponse = require('../../utils/baseResponse');
const lesson = require('./lesson');
/**
 * Get `n` elements randomly from `array`.
 * @param {Array} array 
 * @param {number} n 
 * @returns {array}
 */
function getRandomFromList(array, n) {
   const randomFills = (array.length > 1 && n < array.length) ? array.sort(() => .5 - Math.random()).slice(0, n) : array;
   return randomFills;
}

/**
 * Exercises
 * @param {Request} req 
 * @param {Request} res 
 */
const exercises = async (req, res) => {
   const courseId = req.params.courseId;
   const lessonId = req.params.lessonId;
   const exercisesData = await lesson.helper(courseId, lessonId);
   if (exercisesData.meta.code != 200) {
      res.send(BaseResponse.ofError('Data not found', 404));
   }
   else {
      const fill = [...exercisesData.data.fill];
      const randomFills = getRandomFromList(fill, 1);

      const choice = [...exercisesData.data.choice];
      const randomChoices = getRandomFromList(choice, 3);

      const sentence = [...exercisesData.data.sentence];
      const randomSentences = getRandomFromList(sentence, 3);

      const match = exercisesData.data.match;
      const keys = Object.keys(match);
      const randomKeys = getRandomFromList(keys, 5)
      const randomMatch = {}
      for (let i = 0; i < randomKeys.length; i++) {
         randomMatch[randomKeys[i]] = match[randomKeys[i]];
      }

      const data = {
         "fill": randomFills,
         "choice": randomChoices,
         "match": randomMatch,
         "sentence": randomSentences
      }
      res.send(BaseResponse.ofSucceed(data));
   }
}
module.exports = exercises;