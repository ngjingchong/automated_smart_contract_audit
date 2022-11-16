import React from "react";
import Header from "./header";

function Welcome() {
    //special of jsx file is html code can be store in to var for processing
    var file = <code >src/pages/welcome.jsx</code>;

    return (
        <div id="welcome" className="container_wrapper">
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

export default Welcome;