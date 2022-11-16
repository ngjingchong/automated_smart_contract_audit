import React from "react";
import Header from "./header";

function Dashboard() {
    //special of jsx file is html code can be store in to var for processing
    var file = <code >src/pages/dashboard.jsx</code>;

    return (
        <div id='dashboard' className="container_wrapper">
          <Header/>
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit {file} and save to reload.
            </p>
          </header> */}
        </div>
    )
}

export default Dashboard;