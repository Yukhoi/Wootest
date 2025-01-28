const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const { generateCourseCode } = require("./utils/generators"); 

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Question",
        default: [],
    },
    description: {
      type: String,
      required: true,
      maxLength: 256,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: generateCourseCode
    },
  },
  { timestamps: true }
);

courseSchema.pre('findOneAndUpdate', function (next) {
  this._update.$unset = this._update.$unset || {};
  this._update.$unset.code = 1;
  next();
});

courseSchema.pre('updateOne', function (next) {
  this._update.$unset = this._update.$unset || {};
  this._update.$unset.code = 1;
  next();
});

courseSchema.pre('updateMany', function (next) {
  this._update.$unset = this._update.$unset || {};
  this._update.$unset.code = 1;
  next();
});

module.exports = courseSchema;
