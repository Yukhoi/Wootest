import { Course } from "../models/course.model";

export async function fetchCourses() {
  const res = await fetch('http://localhost:3000/api/courses');
  return res.json() as Promise<Course[]>;
};

export async function fetchCoursesByQuery(query: string) {
  const res = await fetch(`http://localhost:3000/api/courses/search/${query}`);
  return res.json() as Promise<Course[]>;
}

export async function fetchCourseDetails(code: string) {
  const res = await fetch(`http://localhost:3000/api/courses/${code}`);
  return res.json() as Promise<Course>;
}