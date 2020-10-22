export function getQuestions() {
  return new Promise((resolve) =>
    resolve([
      {
        problem: "Here goes the question?",
        options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
      },
      {
        problem: "Here goes another question?",
        options: [],
      },
    ])
  );
}
