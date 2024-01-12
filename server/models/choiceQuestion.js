const mongoose = require('mongoose');
const { Schema } = mongoose;
const choiceQuestionSchema = new Schema({
   question: String,
   answers: [String],
   correct: String
});
const ChoiceQuestion = mongoose.model('choice_question', choiceQuestionSchema);
module.exports = ChoiceQuestion;