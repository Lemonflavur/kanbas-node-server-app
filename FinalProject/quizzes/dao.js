import model from "./model.js";

export const createQuiz = (quiz) => model.create(quiz);
export const findAllQuizzes = () => model.find();
export const findByQuizId = (quizId) => model.findById({_id: quizId});
export const findByQuizName = (quizname) => model.findOne({quizname: quizname});
export const updateQuiz = (quizId, quiz) => model.updateOne({_id: quizId}, { $set: quiz} );
export const deleteQuiz = (quizId) => model.deleteOne({_id: quizId});

