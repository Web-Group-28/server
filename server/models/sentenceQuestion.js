const mongoose = require('mongoose');
const { Schema } = mongoose;
const sentenceQuestionSchema = new Schema({
   words: [String],
   sentence: String,
   correct: String
});
const SentenceQuestion = mongoose.model('sentence_question', sentenceQuestionSchema);
module.exports = SentenceQuestion;