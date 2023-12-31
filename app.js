import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import session from "express-session";

import cors from "cors";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";

import UserRoutes from "./Project/users/routes.js";


const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
app.use(
    session(sessionOptions)
);

app.use(express.json());
UserRoutes(app);

ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
//app.listen(4000);

app.listen(process.env.PORT || 4000);
