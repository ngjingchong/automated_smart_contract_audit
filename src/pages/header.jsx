import logo from '../images/XContractLogo.png';
import React from "react";
import Nav from './nav';
import { StyleSheet } from 'react-native';

function Header() {
<<<<<<< HEAD
    return (
      <div style={{display: "contents"}}>
        <img style={styles.centerItem} src={logo} className="page_logo" alt="logo" />
        <Nav />
      </div>
    )
=======
  return (
    <div style={{ display: "contents" }}>
      <img style={styles.centerItem} src={logo} className="page_logo" alt="logo" id="heading" />
      <Nav />
    </div>
  )
>>>>>>> 6c149728f61be4c6c8fdb64547157113c5a3ecdd
}

const styles = StyleSheet.create({
  centerItem: {
    position: "absolute",
    top: "0%",
    left: "50%",
    marginLeft: "-120px" 
  }
});
<<<<<<< HEAD

=======
>>>>>>> 6c149728f61be4c6c8fdb64547157113c5a3ecdd
export default Header;