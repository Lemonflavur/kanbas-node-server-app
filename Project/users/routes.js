import * as dao from "./dao.js";
//import {findUserByFirstName} from "./dao.js";
//import {findUserByCredentials, findUserByUsername} from "./dao.js";
//let currentUser = null;

function UserRoutes(app) {

    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    app.post("/api/users", createUser);

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params._id);
        res.json(status);
    };

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };


    const findByUsername = async (req, res) => {
        const username = req.params.username;
        const user = await dao.findUserByUsername(username);
        res.json(user);
    };

    const findUserFirstName = async (req, res) => {
        const firstName = req.params.firstName;
        const user = await dao.findUserByFirstName(firstName);
        res.json(user);
    };

    const findByCredentials = async (req, res) => {
        const { username, password,  } = req.params;
        const user = await dao.findUserByCredentials(username, password)
        res.json(user);
    };

    const updateFirstName = async (req, res) => {
        const id = req.params.id;
        const newFirstName = req.params.firstName;
        const status = await dao.updateUser(id, {firstName: newFirstName});
        res.json(status);
    };

    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
    };


    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
            req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };


    const signin = async (req, res) => {
        const { username, password } = req.body;
        const user = await dao.findUserByCredentials(username, password);
        if (user) {
            const currentUser = user;
            req.session['currentUser'] = currentUser;
            res.json(user);
        } else {
            res.sendStatus(403);
        }

    };

    const account = async (req, res) => {
        //const currentUser = req.session["currentUser"];
        res.json(req.session['currentUser']);
    };


    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };


    //app.post("/api/users/:username/:password/:email/:role", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.get("/api/users/username/:username", findByUsername);
    app.get("api/users/firstName/:firstName", findUserFirstName);
    app.get("/api/users/credentials/:username/:password", findByCredentials)
    app.put("/api/users/:userId", updateUser);
    app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName);

    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
}
export default UserRoutes;