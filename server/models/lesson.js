const mongoose = require('mongoose');
const choiceQuestion = require('./choiceQuestion');
const sentenceQuestion = require('./sentenceQuestion');
const { Schema } = mongoose;
const lessonSchema = new Schema({
   title: String,
   choice: [choiceQuestion],
   match: Object,
   sentence: [sentenceQuestion]
});
const lesson = mongoose.model('lesson', lessonSchema);
module.exports = lesson;