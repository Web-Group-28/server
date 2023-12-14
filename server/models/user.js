const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    weekScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
