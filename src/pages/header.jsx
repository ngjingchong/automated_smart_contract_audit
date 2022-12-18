import logo from '../images/ASCA_logo.png';
import React from "react";

function Welcome() {
    //special of jsx file is html code can be store in to var for processing
    var file = <code >src/pages/welcome.jsx</code>;

    return (
        <div style={{display: "contents"}}>
          <img id="heading" src={logo} className="page_logo" alt="logo" />
        </div>
    )
}

export default Welcome;