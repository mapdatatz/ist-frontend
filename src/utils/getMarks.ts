const getMarks = (quiz: any) => {
    let questions = 0;
    let marks = 0;
    if (quiz) {
      questions = quiz.questions.length;
      marks = questions === 0 ? 0 : 100/questions;
    }
    return { questions, marks };
  }

  export default getMarks