const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { Schema } = mongoose;
const lessonSchema = new Schema({
   title: String,
   choice: [ObjectId],
   match: Object,
   sentence: [ObjectId],
   fill: [ObjectId],
   userScore: {
      type: Number,
      default: 0,
   },
});
const Lesson = mongoose.model('lesson', lessonSchema);
module.exports = Lesson;