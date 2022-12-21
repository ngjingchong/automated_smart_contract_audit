import ListGroup from 'react-bootstrap/ListGroup';
import React, { Component, useState, useRef, useEffect } from 'react';
import noteLogo from '../images/note.png';
import { Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { type } from '@testing-library/user-event/dist/type';

function ListOfReport() {

  const [reports, setReports] = useState([])
  const [showList, setList] = useState(true)
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
    setList(false)
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

  centerContent: {
    display: "flex", justifyContent: "center", paddingTop: "25px"
  },

  screenContent: {
    position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)', backgroundColor: "white", padding: "9px",
  },

  pdfImg: {
    marginLeft: "55px", marginTop: "40px", width: "5rem", height: "5rem"
  },

  styleTable: {
    minWidth: 650, borderCollapse: 'separate', borderSpacing: '0px 4px'
  },

  severityContainer: {
    display: "flex", justifyContent: "center", marginTop: "10px"
  },

  titleContainer: {
    marginBottom: "5px", marginTop: "10px", fontWeight: "bold", textAlign: "center", fontSize: "18px"
  },

  pdfButton: {
    fontWeight: 'bolder', textDecoration: "underline", color: "#020E5D"
  }
});

const steps = [
  {
    selector: "#title",
    content: "Click on the title from the table content to see the error(s) found in the smart contract",
  },
  {
    selector: "#severity",
    content: "Click on the severity from the table content to see its description",
  },
  {
    selector: "#problem",
    content: "Click on the icon for solution",
  },
  {
    selector: "#percentage",
    content: "The percentage shows how dangerous of the smart contract is",
  },
  {
    selector: "#downloadPDF",
    content: "Click to download your smart contract in PDF form",
  },
];

const recommendation = [
  { check: "reentrancy-eth", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-20' },
  { check: "reentrancy-no-eth", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-38' },
  { check: "reentrancy-benign", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-56' },
  { check: "reentrancy-events", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-57' },
  { check: "reentrancy-unlimited-gas", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-75' },
  { check: "constant-function-asm", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-35' },
  { check: "constant-function-state", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-36' },
  { check: "deprecated-standards", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-62' },
  { check: "pragma", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-68' },
  { check: "solc-version", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-70' },
  { check: "protected-vars", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-6' },
  { check: "suicidal", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-10' },
  { check: "unprotected-upgrade", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-13' },
  { check: "variable-scope", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-49' },
  { check: "events-access", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-52' },
  { check: "events-maths", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-53' },
  { check: "domain-separator-collision", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-24' },
  { check: "erc20-interface", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-26' },
  { check: "erc721-interface", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-27' },
  { check: "erc20-indexed", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-63' },
  { check: "uninitialized-state", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-11' },
  { check: "uninitialized-storage", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-12' },
  { check: "uninitialized-local", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-43' },
  { check: "uninitialized-fptr-cst", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-48' },
  { check: "function-init-state", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-64' },
  // {check:  "backdoor", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration'},
  { check: "shadowing-state", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-9' },
  { check: "controlled-delegatecall", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-17' },
  { check: "shadowing-abstract", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-31' },
  { check: "tx-origin", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-40' },
  { check: "shadowing-builtin", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-46' },
  { check: "shadowing-local", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-47' },
  { check: "assembly", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-59' },
  { check: "rtlo", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-8' },
  { check: "public-mappings-nested", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-7' },
  { check: "weak-prng", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-23' },
  { check: "timestamp", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-58' },
  { check: "similar-names", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-76' },
  { check: "too-many-digits", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-77' },
  { check: "multiple-constructors", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-4' },
  { check: "name-reused", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-5' },
  { check: "write-after-write", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-33' },
  { check: "reused-constructor", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-39' },
  { check: "unused-return", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-44' },
  { check: "redundant-statements", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-69' },
  { check: "unimplemented-functions", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-71' },
  { check: "unused-state", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-72' },
  { check: "dead-code", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-74' },
  { check: "abiencoderv2-array", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration' },
  { check: "array-by-reference", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-2' },
  { check: "storage-array", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-21' },
  { check: "incorrect-shift", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-3' },
  { check: "controlled-array-length", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-16' },
  { check: "unchecked-transfer", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-22' },
  { check: "incorrect-equality", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-28' },
  { check: "locked-ether", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-29' },
  { check: "mapping-deletion", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-30' },
  { check: "divide-before-multiply", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-37' },
  { check: "unchecked-lowlevel", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-41' },
  { check: "unchecked-send", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-42' },
  { check: "incorrect-modifier", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-45' },
  { check: "incorrect-unary", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-54' },
  { check: "missing-zero-check", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-55' },
  { check: "assert-state-change", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-60' },
  { check: "missing-inheritance", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-66' },
  { check: "naming-convention", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-67' },
  { check: "constable-states", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-78' },
  { check: "external-function", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-79' },
  { check: "arbitrary-send-erc20", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-1' },
  { check: "arbitrary-send-erc20-permit", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-14' },
  { check: "arbitrary-send-eth", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-15' },
  { check: "low-level-calls", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-65' },
  { check: "enum-conversion", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-25' },
  { check: "tautology", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-32' },
  { check: "boolean-cst", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-34' },
  { check: "boolean-equal", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-61' },
  { check: "delegatecall-loop", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-18' },
  { check: "msg-value-loop", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-19' },
  { check: "calls-loop", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-51' },
  { check: "costly-loop", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-73' },
]


export default ListOfReport;