const mongoose = require("mongoose");
const choiceSchema = require("./choice-schema");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    title: {
      type: String,
      required: true,
    },
    choices: [choiceSchema],
  },
  { timestamps: true }
);

module.exports = questionSchema;
