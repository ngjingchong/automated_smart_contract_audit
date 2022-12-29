import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import Login from './login'
import Alert from 'react-bootstrap/Alert';

function Navigation() {
  const [ isFirstRender, setIsFirstRender ] = useState(true)

  const [modalShow, setModalShow] = useState(false);
  const nav_style = {
      top: "20px",
      right: "20px",
      height: "40px",
      fontSize: "15px",
      position: "absolute",
      display: "inline-flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignContent: "center",
      flexWrap: "wrap",
  }
  
  const [ isLogout, setIsLogout] = useState(false);
  var Alert_position_style = {
    display: "block",
    transitionDuration: "1s",
    position: "fixed",
    bottom: "15px",
    right: "30px"
  }
  function showAlert () {
    document.getElementById("logoutAlert").classList.add("show")
    document.getElementById("logoutAlert").style.display = "block"
  }
  function hideAlert () {
    document.getElementById("logoutAlert").classList.remove("show")
    document.getElementById("logoutAlert").style.display = "none"
  }
  useEffect(() => {
    if (isLogout === true) {
      showAlert()
      setTimeout(() => setIsLogout(false), 3000);
    } else {
      hideAlert()
    }
  }, [isLogout])

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;

    document.body.appendChild(script);
  }, [])
  
  return (     
    <>
      <Nav style={nav_style} variant="pills" activeKey={window.location.pathname}>
        <Nav.Item>
          <Nav.Link href="/" >Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/audit_process">Start Scanning</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">
            <FontAwesomeIcon 
              icon={faUser}
              onClick={() => {setModalShow(true); setIsFirstRender(false)}}
            />
          </Nav.Link>
        </Nav.Item>
      </Nav>
      
      <Login show={modalShow} onHide={() => setModalShow(false)} handleLogout={() => setIsLogout(true)} isFirstRender={isFirstRender}/>
      
      <Alert id="logoutAlert" style={Alert_position_style} key="success" variant="success">
        You have successfully <b>logged out</b> from your <em>Google/Facebook</em> account !
      </Alert>
    </>
  )
}

export default Navigation;