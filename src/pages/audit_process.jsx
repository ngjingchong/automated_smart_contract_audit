import React, {Component, useEffect, useState } from "react";
import Header from "./header";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import './audit_process.css';

import ContractUploader from './contract_uploader';
import VulnerabilityPicker from './contract_vulnerabilities_picker';
import VulnerabilityDetails from './contract_vulnerability_details';
import AuditReport from './contract_audit_report';

function Audit_Process() {
  const [files, setFiles] = useState([])
  var [vulnerabilities, setVulnerabilities] = useState([{id:0, name:"Reentrancy"}, {id:1, name:"Indirect Execution of Unknown Code"}, {id:2, name:"Replay Signature"}])

// console.log(files)
  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }

  function filesHandler (file) {
    console.log(files)
    setFiles([...files,file]);
  }

  // setup step validators, will be called before proceeding to the next step
  function step1Validator() {
    // // upload file
    // const formData = new FormData();
    // formData.append(
    //     "newFile",
    //     file,
    //     file.name
    // )
    // axios.post('http://localhost:8080/upload', formData)
    //     .then((res) => {
    //         setFiles([...files, file])
    //     })
    //     .catch((err) => {
    //         // inform the user
    //         console.error(err)
    //         removeFile(file.name)
    //     });
    return true;
  }

  function step2Validator() {
    return true;
  }
  
  function step3Validator() {
    return true;
  }
  
  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
    alert("submited");
  }

  // useEffect(() => {
  //   console.log(files)
  // });

  return (
    <div id='audit_process' className='container_wrapper'>
      <Header/>
      <div className='Step_container'>
        <StepProgressBar 
          startingStep={0} 
          onSubmit={onFormSubmit} 
          steps={[
            {
              label: 'Upload',
              name: 'step 1',
              content: <ContractUploader files={files} filesHandler={filesHandler} removeFile={removeFile} />,
              validator: step1Validator
            },
            {
              label: 'Vulnerability',
              name: 'step 2',
              content: <VulnerabilityPicker vulnerabilities={vulnerabilities}/>,
              validator: step2Validator
            },
            {
              label: 'Scanning',
              name: 'step 3',
              content: <VulnerabilityDetails/>,
              validator: step3Validator
            },
            {
              label: 'Audit Report',
              name: 'step 4',
              content: <AuditReport/>,
              validator: step3Validator
            }
          ]}
        />
      </div>
    </div>
  )
}

// sending notification to users
// function showStayHydratedNotification() {
//   chrome.notifications.create({
//     type: 'basic',
//     iconUrl: 'stay_hydrated.png',
//     title: 'Time to Hydrate',
//     message: 'Everyday I\'m Guzzlin\'!',
//     buttons: [
//       { title: 'Keep it Flowing.' }
//     ],
//     priority: 0
//   });
// }

export default Audit_Process;