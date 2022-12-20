import ListGroup from 'react-bootstrap/ListGroup';
import React, { Component, useState, useEffect } from 'react';
import pdfLogo from '../images/pdfLogo.png';
import { Button, StyleSheet } from 'react-native';
import axios from 'axios';

function ListOfReport() {

  const [reports, setReports] = useState([])

  useEffect(() => {
    getAllReports();
  }, []);

  function getAllReports() {

    axios.get('http://127.0.0.1:5000/report')
      .then((res) => {
        setReports(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function handleClick(report) {
    
    // fetch('http://127.0.0.1:5000/data', {

    //   method: 'POST', 
    //   // mode: 'cors', 
    //   body: JSON.stringify(report)
    // })
  }

  return (
    <ListGroup style={styles.listGroup}>
      {reports.map((report, i) => {
        return (
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <img src={pdfLogo} className="pdf_logo" alt="logo" style={{ width: "3rem", height: "3rem" }} />
            <div className="ms-2 me-auto">
              <div className="fw-bold">{report}</div>
            </div>
          <ListGroup.Item style={styles.scanButton} action href='/report_result'> 
              Read 
            </ListGroup.Item>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  );
}
//action key ={i} onClick={handleClick(report)} 
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
  }
});

export default ListOfReport;