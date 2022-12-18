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
  var [percentage, setPercentage] = useState(66)
  const prevContractsRev = useRef();
  const isRendered = useRef(true);

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
    prevContractsRev.current = contracts
    if (!isRendered.current && contracts.length != 0) {
      
      // const upload = multer({ dest: 'uploads/' })
      // axios.post('/upload-contracts', upload.array('contracts', contracts, function (req, res, next){}))
      // .then((res) => {
      //   console.log(res.data)
      // })
      // .catch((err) => {
      //     // inform the user
      //     console.error(err)
      // })

      const formData = new FormData();

      contracts.forEach((contract) => {
        // Get the file object
        // const file = contract
        // const fs = require('fs');
  
        // // Specify the path to the directory where you want to save the file
        // let data = "This is a file containing a collection of books.";
          
        // // Use the fs.writeFile() method to save the file
        // fs.writeFile("books.txt", data, (err) => {
        //   if (err)
        //     console.log(err);
        //   else {
        //     console.log("File written successfully\n");
        //     console.log("The written has the following contents:");
        //     console.log(fs.readFileSync("books.txt", "utf8"));
        //   }
        // });

        formData.append("contracts", contract);
      })
      
      // for(let obj of formData) {
      //   console.log(obj); // key1 = value1, then key2 = value2
      // }
    }
    isRendered.current = false
  },[contracts])
  useEffect(() => { // run when user picked an detector to scan against their smart contracts
    if (detectorSelected) {
      if(window.confirm("start scanning your smart contracts agains > " + detectorSelected.id + "?")){ 
        // console.log(JSON.stringify(detectorSelected))
        axios({
          url: '/scan',
          method: 'POST',
          data: detectorSelected
        })
        .then(function (response) {
            // your action after success
            console.log(response);
        })
        .catch(function (error) {
          // your action on error success
            console.log(error);
        });
      }
    }
  },[detectorSelected])

  const set_scan_vulnerability = (vulnerabilityAuditorPicked) => {
    // console.log(vulnerabilityAuditorPicked)
    setDetector(vulnerabilityAuditorPicked)
  }

  // setup step validators, will be called before proceeding to the next step
  function step1Validator(contracts) {
    alert(contracts)
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
              content: 
                <>
                  <ContractUploader setContractsHandler={setContractsHandler} />
                  {/* {console.log(<FileList contracts={contracts} removeFile={removeFile} />)} */}
                </>,
              validator: () => step1Validator(contracts)
            },
            {
              label: 'Vulnerability',
              name: 'step 2',
              content: <VulnerabilityPicker detectorSelected={detectorSelected} set_scan_vulnerability={set_scan_vulnerability}/>,
              validator: step2Validator
            },
            {
              label: 'Scanning',
              name: 'step 3',
              content: <Scan percentage={percentage} />,
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