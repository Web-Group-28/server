const mongoose = require('mongoose');
const { Schema } = mongoose;
const lesson = require('./lesson');
const partSchema = new Schema({
   title: String,
   description: String,
   lessons: [lesson.schema]
});
const part = mongoose.model('part', partSchema);
module.exports = part;