import * as dao from "./dao.js"
//import model from "./model.js";
let currentQuiz = null;

function QuizRoutes(app) {

    const quizAccount = async (req, res) => {
        res.json(req.session['currentQuiz']);
    };
    app.post("/api/quizzes/quizAccount", quizAccount);


    const createQuiz = async (req, res) => {
        const quiz = await dao.createQuiz(req.body);
        res.json(quiz);
    };
    app.post("/api/quizzes", createQuiz);


    // ***** Similar to the Signup API ***** //
    /** This Function creates a new quiz
     *  and takes the user to the Quiz Details Page
     */
    const createQuizInfo = async (req, res) => {
        const quiz = await dao.findByQuizName(req.body.quizname);
        if (quiz) {
            res.status(400).json(
                { message: "Quiz name already taken" });
            return;
        }
        currentQuiz  = await dao.createQuiz(req.body);
        req.session['currentQuiz'] = currentQuiz;
        res.json(currentQuiz);
    };
    app.put("/api/quizzes/createquizinfo", createQuizInfo);


    const findAllQuizzes = async (req, res) => {
        const quiz = await dao.findAllQuizzes();
        res.json(quiz);
    };
    app.get("/api/quizzes", findAllQuizzes);


    const findByQuizId = async (req, res) => { };
    app.get("/api/quizzes/:quizId", findByQuizId);


    const findByQuizName = async (req, res) => {
        const quizname = req.params.quizname;
        const quiz = await dao.findByQuizName(quizname);
        res.json(quiz);
    };
    app.post("/api/quizzes/quizname/:quizname", findByQuizName);

    const updateQuiz = async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.updateQuiz(quizId, req.body);
        currentQuiz = await dao.findByQuizId(quizId);
        req.session['currentQuiz'] = currentQuiz;
        res.json(status);
    };
    app.post("/api/quizzes/:quizId", updateQuiz);


    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.quizId);
        res.json(status);
    };
    app.delete("/api/quizzes/:quizId", deleteQuiz);
}
export default QuizRoutes;