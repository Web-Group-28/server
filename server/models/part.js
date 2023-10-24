const mongoose = require('mongoose');
const { Schema } = mongoose;
const lesson = require('./lesson');
const { ObjectId } = require('mongodb');
const partSchema = new Schema({
   title: String,
   description: String,
   lessons: [ObjectId]
});
const part = mongoose.model('part', partSchema);
module.exports = part;