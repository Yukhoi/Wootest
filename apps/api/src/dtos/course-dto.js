class CourseDTO {
  constructor(course) {
    this._id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.code = course.code;
  }
}

class CourseDetailsDTO {
  constructor(courseDetail) {
    this.title = courseDetail.title;
    this.description = courseDetail.description;
    this.questions = courseDetail.questions;
  }
}

module.exports = { 
  CourseDetailsDTO,
  CourseDTO
};
