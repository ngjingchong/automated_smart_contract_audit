import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect, React } from 'react';
import solidityLogo from '../images/solidityLogo.png';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';
import { Link } from "react-router-dom";
import axios from 'axios';

function ListOfContract() {

  const [contracts, setContracts] = useState([])

  useEffect(() => {
    getAllContracts();
  }, []);

  function getAllContracts() {

    axios.get('http://127.0.0.1:5000/file')
      .then((res) => {
        setContracts(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (

    <div>
      <ListGroup style={styles.listGroup}>
        {contracts.map((contract) => {
          return (
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <img src={solidityLogo} className="solidity_logo" alt="logo" style={{ width: "3rem", height: "3rem" }} />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{contract}</div>
              </div>
              <ListGroup.Item action style={styles.scanButton}>
                Scan
              </ListGroup.Item>
            </ListGroup.Item>
          )
        })}

      </ListGroup>
      <div style={{ backgroundColor: "white" }}>
        <Link to="/audit_process" className="btn btn-primary" style={{ width: "10rem", margin: "10px 35%" }}>Upload Contract</Link>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    width: "5rem",
    height: "2rem",
    backgroundColor: '#24a0ed',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 3,
    textAlign: 'center',
    color: "white",
    textTransform: "uppercase"
  },
  listGroup: {
    maxHeight: "380px",
    overflowY: "scroll",
    backgroundColor: "white"
  }
});

export default ListOfContract;