const mongoose = require('mongoose');
const { Schema } = mongoose;
const fillQuestionSchema = new Schema({
   left_sentence: String,
   right_sentence: String,
   answers: [String],
   correct: String
});
const FillQuestion = mongoose.model('fill_question', fillQuestionSchema);
module.exports = FillQuestion;