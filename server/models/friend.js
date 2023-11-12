const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { Schema } = mongoose;
const friendSchema = new Schema({
   userID: ObjectId,
   follow_in: [ObjectId],
   follow_out: [ObjectId]
});
module.exports = mongoose.model("friend", friendSchema);