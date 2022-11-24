import React from "react";
import Header from "./header";

function Dashboard() {
    //special of jsx file is html code can be store in to var for processing
    var file = <code >src/pages/dashboard.jsx</code>;

    return (
        <div id='dashboard' className="container_wrapper">
         
            <p>
                Edit {file} and save to reload.
            </p>
        </div>
    )
}

export default Dashboard;