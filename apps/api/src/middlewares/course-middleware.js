const courseService = require('../services/course-service');

const convertCodeToId = async (req, res, next) => {
  const { courseCode } = req.params;
  try {
    const courseId = await courseService.getIdByCode(courseCode);
    if (!courseId) {
      return res.status(404).json({ error: 'Course not found' });
    }
    req.params.courseId = courseId;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to convert course id by code' });
  }
};

module.exports = {
  convertCodeToId,
};