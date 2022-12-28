import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from 'react';
import noteLogo from '../images/note.png';
import { StyleSheet } from 'react-native';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Tour from 'reactour'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ListOfReport() {

  const [reports, setReports] = useState([])
  const [isTourOpen, setIsTourOpen] = useState(false);
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
        if (response.data.results && Object.entries(response.data.results).length !== 0) {
          navigate('../report_result', { state: response.data });
        }
        else {
          Swal.fire({
            title: "Congratulation!",
            html: "<b>Your smart contract is save and can be deployed!<b>",
            confirmButtonText: "THANKS",
          });
        }
      })
  }

  function deleteFileHandler(delpath) {
    console.log(delpath)
    Swal.fire({
      title: 'Are you sure to delete file?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios(
          {
            url: 'http://127.0.0.1:5000/deleteReport',
            method: 'POST',
            data: [delpath]
          })
          .then((response) => {
            console.log(response)
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success'
            }).then(function () {
              window.location.reload();
            });
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    });
  }

  if (reports.length === 0) {
    return (
      <ListGroup style={styles.listGroup}>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <div className="ms-2 me-auto">
            <div>No Report Recorded.</div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    )
  }
  else {
    return (
      <div>
        <ListGroup style={styles.listGroup} id="report">
          {reports.map((report, i) => {
            return (
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <img src={noteLogo} className="note_logo" alt="logo" style={{ width: "2.5rem", height: "2.8rem" }} />
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{report.replace('.sol.json', '')}</div>
                </div>
                <ListGroup.Item id="read" style={styles.scanButton} key={i} value={report} action onClick={e => handleSubmit(e.target.value)}>
                  Read
                </ListGroup.Item>
                <ListGroup.Item style={{ padding: 0, margin: 15, width: "8px", borderStyle: "none" }} actionkey={i} name={report} onClick={e => deleteFileHandler(report)} >
                  <FontAwesomeIcon
                    icon={faTrash} color="#D4D4D4" style={{ fontSize: "1.3rem" }} id="deleteReport"
                  />
                </ListGroup.Item>
              </ListGroup.Item>
            )
          })}
        </ListGroup>
        <div style={{ backgroundColor: "white", textAlign: "center" }}>
          <Link onClick={() => setIsTourOpen(true)} className="btn btn-primary" style={{ width: "10rem", margin: "6px" }}>Tour Guide</Link>
        </div>
        <Tour
          steps={steps}
          isOpen={isTourOpen}
          onRequestClose={() => setIsTourOpen(false)}
        />
      </div>
    );
  }

}

const steps = [
  {
    selector: "#report",
    content: "Here is the list of reports generated previously.",
  },
  {
    selector: "#read",
    content: "Click here to read the report.",
  },
  {
    selector: "#deleteReport",
    content: "Click here to delete the report.",
  },
];

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
    maxHeight: "210px",
    overflowY: "scroll",
  },
});


export default ListOfReport;