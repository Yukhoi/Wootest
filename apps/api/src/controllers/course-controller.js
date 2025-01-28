const courseService = require("../services/course-service");

/**
 * List courses
 */
const list = async (_req, res, next) => {
  try {
    const courses = await courseService.getAll();
    res.status(200).json(courses);
  } catch (err) {
    return next(err);
  }
};

/**
 * Get a specific course by its code
 */
const get = async (req, res, next) => {
  try {
    const course = await courseService.getByCode(req.params.courseCode);
    res.status(200).json(course);
  } catch (err) {
    return next(err);
  }
};

/**
 * Get a specific course and its details by its code
 */
const getDetails = async (req, res, next) => {
  try {
    const course = await courseService.getDetailByCode(req.params.courseCode);
    res.status(200).json({ course });
  } catch (err) {
    return next(err);
  }
}

/**
 * Search for courses by code or title
 */
const search = async (req, res, next) => {
  try {
    const results = await courseService.searchCourses(req.params.searchQuery);
    return res.json(results);
  } catch (error) {
    return next(error);
  }
};

/**
 * Create a course
 */
const create = async (req, res, next) => {
  try {
    const course = await courseService.create(req.body);

    res.status(201).json(course);
  } catch (err) {
    return next(err);
  }
};

/**
 * Update a course
 */
const update = async (req, res, next) => {
  try {
    const course = await courseService.update(req.params.courseId, req.body);

    res.status(200).json(course);
  } catch (err) {
    return next(err);
  }
};

/**
 * Remove a course
 */
const remove = async (req, res, next) => {
  try {
    await courseService.remove(req.params.courseId);

    res.status(204).json();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  list,
  get,
  getDetails,
  search,
  create,
  update,
  remove,
};
