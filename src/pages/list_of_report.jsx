import ListGroup from 'react-bootstrap/ListGroup';
import React, { Component, useState, useEffect } from 'react';
import noteLogo from '../images/note.png';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ListOfReport() {

  const [reports, setReports] = useState([])
  const navigate = useNavigate();

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

  function handleSubmit(path) {
    console.log(path)
    axios(
      {
        url: 'http://127.0.0.1:5000/data',
        method: 'POST',
        data: [path]
      })
      .then((response) => {
        console.log(response)
        navigate('../report_result', { state: response.data });
      })
  }

  return (
    <ListGroup style={styles.listGroup}>
      {reports.map((report, i) => {
        return (
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <img src={noteLogo} className="note_logo" alt="logo" style={{ width: "2.5rem", height: "3rem" }} />
            <div className="ms-2 me-auto">
              <div className="fw-bold">{report.replace('.sol.json', '')}</div>
            </div>
            <ListGroup.Item style={styles.scanButton} key={i} value={report} action onClick={e => handleSubmit(e.target.value)}>
              Read
            </ListGroup.Item>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
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
  },
});


export default ListOfReport;