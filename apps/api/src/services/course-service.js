const CourseModel = require("../db/models/course-model");
const { CourseDTO } = require('../dtos/course-dto');


/**
 * Retrieve the list of all courses
 * @returns {Promise<Array<Course>>} List of courses
 */
const getAll = async () => {
  try {
    const courses = await CourseModel.find();
    return courses.map((course) => new CourseDTO(course));
  } catch (error) {
    throw new Error("Failed to fetch courses list");
  }
};

/**
 * Retrieve a course by its ID
 * @param {String} courseId Course ID
 * @returns {Promise<Course>} Course
 */
const getById = (courseId) => {
  return CourseModel.findById(courseId);
};

/**
 * Retrieve a course by its code
 * @param {String} courseCode Course code
 * @returns {Promise<Course>} Course
 */
const getByCode = async (courseCode) => {
  try{
    const course = await CourseModel.findOne({ code: courseCode });
    return new CourseDTO(course);
  } catch (error) {
    throw new Error('Failed to fetch course by code');
  }
};

/**
 * Get the id of a course by its code
 */
const getIdByCode = async (courseCode) => {
  try {
    const course = await CourseModel.findOne({ code: courseCode }, { _id: 1 });
    return course?._id || null;
  } catch (error) {
    throw new Error('Failed to fetch course id by code');
  }
};

/**
 * Search for courses by code or title
 * @param {String} query Search query
 * @returns {Promise<Array<Course>>} List of courses
 */
const searchCourses = async (query) => {
  try {
    const regex = new RegExp(query, 'i');
    const courses = await CourseModel.find({
      $or: [
        { code: regex },
        { title: regex }
      ]
    });
    return courses.map(course => new CourseDTO(course));
  } catch (error) {
    throw new Error('Failed to search courses');
  }
};

/**
 * Create a new course
 * @param {Course} course Course properties
 * @returns {Promise<Course>} Created course
 */
const create = (course) => {
  const newCourse = new CourseModel({
    ...course,
  });

  return newCourse.save();
};

/**
 * Update a course
 * @param {String} courseId Course ID
 * @param {Object} partialCourse Course properties to update
 * @returns {Promise<Course>} Updated course
 */
const update = async (courseId, partialCourse) => {
  await CourseModel.findOneAndUpdate(
    { _id: courseId },
    {
      $set: {
        ...partialCourse,
      },
      upsert: true,
    }
  );

  return CourseModel.findById(courseId);
};

/**
 * Delete a course
 * @param {String} courseId Course ID
 */
const remove = async (courseId) => {
  await CourseModel.deleteOne({ _id: courseId });
};

module.exports = {
  getAll,
  getById,
  getByCode,
  getIdByCode,
  searchCourses,
  create,
  update,
  remove,
};
