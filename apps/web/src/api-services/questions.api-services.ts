import { Question } from "../models/question.model";

export async function fetchQuestionsByCourse(courseCode: string) {
  const res = await fetch(`http://localhost:3000/api/courses/${courseCode}/questions`);
  return res.json() as Promise<Question[]>;
} 

export async function updateQuestion(question: Question, courseCode: string) {
  const res = await fetch(`http://localhost:3000/api/courses/${courseCode}/questions/${question._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });
  return res.json() as Promise<Question>;
}

export async function duplicateQuestion(questionId: string, courseCode: string) {
  const res = await fetch(`http://localhost:3000/api/courses/${courseCode}/questions/${questionId}/duplicate`, {
    method: 'PUT',
  });
  return res.json() as Promise<Question>;
}



