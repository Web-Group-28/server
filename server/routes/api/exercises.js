const { default: axios } = require("axios");
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
   const exercisesData = (await axios.get(`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`)).data.data;
   if (exercisesData == null) {
      res.send({
         "data": null,
         'meta': {
            'status': 404,
            'message': "Data not found"
         }
      });
   }
   else {
      const fill = [...exercisesData.fill];
      const randomFills = getRandomFromList(fill, 1);

      const choice = [...exercisesData.choice];
      const randomChoices = getRandomFromList(choice, 3);

      const sentence = [...exercisesData.sentence];
      const randomSentences = getRandomFromList(sentence, 3);
      
      const match = exercisesData.match;
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
      res.send({
         "data": data,
         'meta': {
            'status': 200,
            'message': "Data found"
         }
      });
   }
}
module.exports = exercises;