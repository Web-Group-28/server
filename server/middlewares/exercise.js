const FillQuestion = require("../models/fillQuestion");
const ChoiceQuestion = require("../models/choiceQuestion");
const SentenceQuestion = require("../models/sentenceQuestion");

/**
 * Get `n` elements randomly from `array`.
 * @param {Array} array 
 * @param {number} n 
 * @param {String} type
 */
module.exports = async (array, n, type) => {
   const randomFills = (array.length > 1 && n < array.length) ? array.sort(() => .5 - Math.random()).slice(0, n) : array;
   const quiz = [];
   for (let i = 0; i < randomFills.length; i++) {
      const fill = randomFills[i];
      switch (type) {
         case 'fill':
            const fq = await FillQuestion.findById(fill).exec();
            quiz.push(fq);
            break;
         case 'choice':
            const cq = await ChoiceQuestion.findById(fill).exec();
            quiz.push(cq);
            break;
         case 'sentence':
            const sq = await SentenceQuestion.findById(fill).exec();
            quiz.push(sq);
            break;
         default:
            return randomFills;
      }
   }
   return quiz;
};