const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = require('mongodb');
const courseSchema = new Schema({
   courseID: String,
   title: String,
   parts: [ObjectId]
});
const Course = mongoose.model('course', courseSchema);
module.exports = Course;