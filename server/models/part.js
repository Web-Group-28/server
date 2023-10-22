const mongoose = require('mongoose');
const { Schema } = mongoose;
const lesson = require('./lesson');
const partSchema = new Schema({
   title: String,
   description: String,
   lessons: [lesson.schema]
});
partSchema.method('getLessonIDs', function () {
   const ids = [];
   this.lessons.forEach(function (l) {
      ids.push(l._id.toString());
   });
   return ids;
});
const part = mongoose.model('part', partSchema);
module.exports = part;