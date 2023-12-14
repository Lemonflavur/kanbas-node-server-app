import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
        quizname: String,
        type: {
                type: String,
                enum: ["GRADED QUIZ", "UNGRADED QUIZ", "GRADED EXAM", "UNGRADED EXAM"],
                default: "GRADED QUIZ" },
        startDate: Date,
        endDate: Date,
        availableFrom: Date,
        questionCount: String,
        status: String,
        forWhichUser: String,
        points: String,
        assignmentGroup: {
                type: String,
                enum: ["QUIZZES", "ASSIGNMENTS", "EXAMS"],
                default: "QUIZZES" },
        shuffleAnswer: String,
        timeLimit: String,
        multipleAttempts: String,
        viewResponses: String,
        showCorrectAnswers: String,
        oneQuestionATime: String,
        respondusLockDown: String,
        viewQuizResults: String,
        webcamRequired: String,
        lockQuestions: String,
    },
    { collection: "quizzes" });
export default quizSchema;

