const mongoose = require('mongoose');
const fillQuestion = require('./fillQuestion');
const { ObjectId } = require('mongodb');
const { Schema } = mongoose;
const lessonSchema = new Schema({
   title: String,
   choice: [ObjectId],
   match: Object,
   sentence: [ObjectId],
   fill: [ObjectId]
});
const lesson = mongoose.model('lesson', lessonSchema);
module.exports = lesson;