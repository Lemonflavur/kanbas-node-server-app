///import ProjectNavigation from "./ProjectNavigation";
//import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "../../../kanbas-react-web-app/src/Nav.js";
import UserTable from "./table.js";
//import Signin from "./signin";

function Project() {
    return (
        <div className="row">
            <div className="col-2">
                <div>
                    <Nav/>
                    <Route path="/admin/users" element={<UserTable />} />
                </div>



            </div>
        </div>
    );
}
export default Project;