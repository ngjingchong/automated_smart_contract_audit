import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect, React } from 'react';
import solidityLogo from '../images/solidityLogo.png';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';
import { Link } from "react-router-dom";
import axios from 'axios';
import Tour from 'reactour'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ListOfContract() {

  const [contracts, setContracts] = useState([])
  const [isTourOpen, setIsTourOpen] = useState(false);

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

  function handleScan(data) {
    console.log(data)
    axios(
      {
        url: 'http://127.0.0.1:5000/scan_vulnerabilities',
        method: 'POST',
        data: data
      })
      .then((response) => {
        console.log(response)
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
            url: 'http://127.0.0.1:5000/deleteContract',
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

  if (contracts.length === 0) {
    return (
      <ListGroup style={styles.listGroup}>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <div className="ms-2 me-auto">
            <div>No Contract Recorded.</div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    )
  }
  else {
    return (
      <div>
        <ListGroup style={styles.listGroup} id="contract">
          {contracts.map((contract, i) => {
            return (
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <img src={solidityLogo} className="solidity_logo" alt="logo" style={{ width: "3rem", height: "3rem" }} />
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{contract}</div>
                </div>
                <ListGroup.Item action style={styles.scanButton} id="scan" key={i} value={contract} onClick={e => handleScan(e.target.value)}>
                  Scan
                </ListGroup.Item>
                <ListGroup.Item style={{ padding: 0, margin: 15, width: "8px", borderStyle: "none" }} actionkey={i} name={contract} onClick={e => deleteFileHandler(contract)} >
                  <FontAwesomeIcon
                    icon={faTrash} color="#D4D4D4" style={{ fontSize: "1.3rem" }} id="delete"
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
    selector: "#contract",
    content: "Here is the list of contracts scanned before.",
  },
  {
    selector: "#scan",
    content: "Click here to scan the contract again.",
  },
  {
    selector: "#delete",
    content: "Click here to delete the contract.",
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
  }
});

export default ListOfContract;