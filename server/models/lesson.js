const mongoose = require('mongoose');
const choiceQuestion = require('./choiceQuestion');
const sentenceQuestion = require('./sentenceQuestion');
const fillQuestion = require('./fillQuestion');
const { Schema } = mongoose;
const lessonSchema = new Schema({
   title: String,
   choice: [choiceQuestion.schema],
   match: Object,
   sentence: [sentenceQuestion.schema],
   fill: [fillQuestion.schema]
});
const lesson = mongoose.model('lesson', lessonSchema);
module.exports = lesson;