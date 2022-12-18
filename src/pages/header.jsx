import logo from '../images/ASCA_logo.png';
import React from "react";
import Nav from './nav';

function Header() {
    return (
      <div style={{display: "contents"}}>
        <img src={logo} className="page_logo" alt="logo" />
        <Nav />
      </div>
    )
}

export default Header;