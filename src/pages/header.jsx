import logo from '../images/XContractLogo.png';
import React from "react";
import Nav from './nav';

function Header() {
    return (
      <div style={{display: "contents"}}>
        <img src={logo} className="page_logo" alt="logo" id="heading"/>
        <Nav />
      </div>
    )
}

export default Header;