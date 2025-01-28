import { Question } from "./question.model";

export type CourseDetail = {
  _id: string;
  title: string;
  questions: Question[];
};