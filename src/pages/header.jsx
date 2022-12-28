import logo from '../images/XContractLogo.png';
import React from "react";
import Nav from './nav';
import Button from 'react-bootstrap/Button';

function Header() {
  return (
    <div style={{ display: "contents" }}>
      <img src={logo} className="page_logo" alt="logo" id="heading" style={{ marginLeft: "40%" }} />
      <Nav />
    </div>
  )
}

export default Header;