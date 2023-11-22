const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const historySchema = new Schema({
   userID: ObjectId,
   learnedID: [
      {
         courseID: ObjectId,
         lessonID: [ObjectId]
      }
   ]
});
const History = mongoose.model('history', historySchema);
module.exports = History;