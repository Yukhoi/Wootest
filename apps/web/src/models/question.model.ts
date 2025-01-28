export type Question = {
  _id: string,
  title: string,
  choices: Choice[],
}

export type Choice = {
 text: string,
  isCorrect: boolean,
  index: number,
}