import logo from '../images/XContractLogo.png';
import React from "react";
import Nav from './nav';
import { StyleSheet } from 'react-native';

function Header() {
    return (
      <div style={{display: "contents"}}>
        <img style={styles.centerItem} src={logo} className="page_logo" alt="logo" />
        <Nav />
      </div>
    )
}

const styles = StyleSheet.create({
  centerItem: {
    position: "absolute",
    top: "0%",
    left: "50%",
    marginLeft: "-120px" 
  }
});
export default Header;