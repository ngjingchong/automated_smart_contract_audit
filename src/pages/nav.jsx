import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import Login from './login'

function Navigation() {
  
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

  return (     
    <>
      <Nav style={nav_style} variant="pills" activeKey={window.location.pathname}>
        <Nav.Item>
          <Nav.Link href="/" >Tour Guide</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/audit_process">Start Scanning</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">
            <FontAwesomeIcon 
              icon={faUser}
              onClick={() => setModalShow(true)}
            />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Login show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default Navigation;