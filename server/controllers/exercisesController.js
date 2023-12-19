const BaseResponse = require("../utils/baseResponse");
const search = require('../middlewares/lesson');
const getRandomFromList = require('../middlewares/exercise');

class ExercisesController {
   async exercises(req, res) {
      const courseId = req.params.courseId;
      const lessonId = req.params.lessonId;
      const exercisesData = await search(courseId, lessonId);
      if (exercisesData.meta.code != 200) {
         res.send(BaseResponse.ofError('Data not found', 404));
      }
      else {
         const FILL = 'fill';
         const CHOICE = 'choice';
         const SENTENCE = 'sentence';
         const fill = [...exercisesData.data.fill];
         const randomFills = await getRandomFromList(fill, 1, FILL);

         const choice = [...exercisesData.data.choice];
         const randomChoices = await getRandomFromList(choice, 3, CHOICE);

         const sentence = [...exercisesData.data.sentence];
         const randomSentences = await getRandomFromList(sentence, 3, SENTENCE);

         const match = exercisesData.data.match;
         const keys = Object.keys(match);
         const randomKeys = await getRandomFromList(keys, 5, "MATCH");
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
}
module.exports = new ExercisesController();