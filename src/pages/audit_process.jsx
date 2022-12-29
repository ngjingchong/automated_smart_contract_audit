import React, { useEffect, useState, useRef } from "react";
import Header from "./header";
import StepProgressBar from 'react-step-progress';
import axios from 'axios';

import 'react-step-progress/dist/index.css';
import './audit_process.css';

import FileList from './contract_file_list';
import ContractUploader from './contract_uploader';
import VulnerabilityPicker from './contract_vulnerabilities_picker';
import Scan from './contract_scan_progress_indicator';
import AuditReport from './contract_audit_report';

function Audit_Process() {
  const [contracts, setContracts] = useState([])
  const [detectorSelected, setDetector] = useState()
  const [percent, setPercent] = useState(0)
  const prevContractsRev = useRef(contracts)

  const setContractsHandler = (new_contracts) => {
    const new_contracts_list = prevContractsRev.current.concat(new_contracts)
    setContracts(new_contracts_list)
  }
  const removeFile = (filename) => {
    setContracts(contracts.filter(f => f.name !== filename))
  }

  //delete file
  const deleteFileHandler = (_index) => {
    // console.log(_index)
    // console.log(contracts)
    // acceptedFiles.splice(_index, 1)
  }

  useEffect(() => {
    document.getElementById("logoutAlert").style.display = "none"
    prevContractsRev.current = contracts
  },[contracts])

  useEffect(() => { // run when user picked an detector to scan against their smart contracts
    if (detectorSelected) {
      if(window.confirm("start scanning your smart contracts agains > " + detectorSelected.id + "?")) {
       
        const formData = new FormData()
        // append every files uploaded by user in contracts into formData
        contracts.forEach((contract) => {
          formData.append(contract.name, contract);
        })

        formData.append("detector", detectorSelected.id)
        // post contracts via the API for processing
        axios.post('http://127.0.0.1:5000/scan_vulnerabilities', formData)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
            // inform the user
            console.error(err)
        })

        // To list out what are the files in the formData
        // for(let obj of formData) {
        //   console.log(obj); // key1 = value1, then key2 = value2
        // }
      }
    }
  },[detectorSelected])

  useEffect(() => {
    if(percent === 100){
      // direct user to next step if the percentage has reached 100%
      document.getElementsByClassName("_hsN1w")[0].click()
    }
  },[percent])

  const set_scan_vulnerability = (vulnerabilityAuditorPicked) => {
    // console.log(vulnerabilityAuditorPicked)
    setDetector(vulnerabilityAuditorPicked)
  }

  // setup step validators, will be called before proceeding to the next step
  const step1Validator = (contracts) => {
    // ensure user has uploaded at least 1 contract to be scanned before proceeding to next step
    if (contracts.length === 0){
      alert("Please upload at least 1 contract to proceed")
      return false
    }
    return true;
  }

  return (
    <div id='audit_process' className='container_wrapper'>
      <Header/>
      <div className='Step_container'>
        <StepProgressBar 
          startingStep={0} 
          steps={[
            {
              label: 'Upload',
              name: 'step 1',
              content: 
                <>
                  <ContractUploader setContractsHandler={setContractsHandler} />
                  <FileList contracts={prevContractsRev.current} removeFile={removeFile} />
                </>,
              validator: () => step1Validator(prevContractsRev.current)
            },
            {
              label: 'Vulnerability',
              name: 'step 2',
              content: <VulnerabilityPicker detectorSelected={detectorSelected} set_scan_vulnerability={set_scan_vulnerability}/>
            },
            {
              label: 'Scanning',
              name: 'step 3',
              content: <Scan percent={percent} setPercent={() => setPercent(100)}/>
            },
            {
              label: 'Audit Report',
              name: 'step 4',
              content: <AuditReport/>
            }
          ]}
        />
      </div>
    </div>
  )
}

export default Audit_Process;