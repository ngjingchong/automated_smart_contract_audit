import React, { useEffect, useState, useRef } from "react";
import Header from "./header";
import StepProgressBar from 'react-step-progress';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import 'react-step-progress/dist/index.css';
import './audit_process.css';

import FileList from './contract_file_list';
import FileItem from './contract_file_item'
import ContractUploader from './contract_uploader';
import VulnerabilityPicker from './contract_vulnerabilities_picker';
import Scan from './contract_scan_progress_indicator';
import AuditReport from './contract_audit_report';

function Audit_Process() {
  const [contracts, setContracts] = useState([])
  const [detectorSelected, setDetector] = useState()
  const [percent, setPercent] = useState(0)
  const prevContractsRev = useRef(contracts)  
  const navigate = useNavigate();

  const setContractsHandler = (new_contracts) => {
    const new_contracts_list = prevContractsRev.current.concat(new_contracts)
    setContracts(new_contracts_list)
  }
  const removeFile = (files) => {
    console.log(files)
    setContracts(files)
    prevContractsRev.current = files
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

  const redirectHandler = () => {
    // if (prevContractsRev.current.length === 1){
    //   const path = "report_" + prevContractsRev.current[0].name + ".json"
    //   axios(
    //     {
    //       url: 'http://127.0.0.1:5000/data',
    //       method: 'POST',
    //       data: [path]
    //     })
    //     .then((response) => {
    //       console.log(response)
    //       navigate('../report_result', { state: response.data });
    //       if (response.data.results && Object.entries(response.data.results).length !== 0) {
    //       }
    //     })
    // } else {
      navigate('../scan_and_view_content');
    // }
    // console.log(prevContractsRev)
  }

  const passContracts = () => {
    return prevContractsRev.current
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
                  <FileList removeFile={removeFile} getContracts={passContracts}/>
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
              content: <AuditReport redirectHandler={redirectHandler}/>
            }
          ]}
        />
      </div>
    </div>
  )
}

export default Audit_Process;