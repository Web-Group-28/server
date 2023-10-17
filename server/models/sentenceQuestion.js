const mongoose = require('mongoose');
const { Schema } = mongoose;
const sentenceQuestionSchema = new Schema({
   words: [String],
   left_sentence: String,
   correct: String
});
const sentenceQuestion = mongoose.model('sentence_question', sentenceQuestionSchema);
module.exports = sentenceQuestion;