import {Navigate, Route, Routes} from "react-router-dom";
import Signin from "./users/signin.js";
import ProjectNavigation from "./users/ProjectNavigation";
import Account from "./users/account.js";

import Courses from "../../kanbas-react-web-app/src/Kanbas/Courses/index.js";
import Project from "./users";

function Assignment6() {
    return (
        <div className="col-10">
            <div>
                <ProjectNavigation/>
            </div>
            <Routes>
                <Route path="/" element={<Navigate to="/Project/home" />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/account" element={<Account />} />


            </Routes>
        </div>
    );
}
export default Assignment6;