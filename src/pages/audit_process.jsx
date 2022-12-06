import React, {Component, useEffect, useState } from "react";
import Header from "./header";
import StepProgressBar from 'react-step-progress';
import axios from 'axios'

import 'react-step-progress/dist/index.css';
import './audit_process.css';

import ContractUploader from './contract_uploader';
import VulnerabilityPicker from './contract_vulnerabilities_picker';
import Scan from './contract_scan_progress_indicator';
import AuditReport from './contract_audit_report';

function Audit_Process() {
  const [contracts, setContracts] = useState([])
    // {id:0, title:"Reentrancy",
    //   matrix: [
    //     {title : "Overall Risk Level", reading : 3},
    //     {title : "Likelihood Level", reading : 2},
    //     {title : "Impact Level", reading : 1.5}],
    //   description:[
    //   {title: "Description", content: "Aliquam volutpat consectetur lorem, placerat consectetur erat imperdiet id. Vivamus hendrerit tristique purus. Ut consectetur facilisis egestas. Praesent ultricies massa in porta efficitur. Duis placerat non tellus lobortis sodales. Donec ut lobortis turpis. Nam mollis ultrices consequat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur ullamcorper turpis finibus elit porta malesuada. \n\n" + 
    //   "Nulla tincidunt in ex non efficitur. Suspendisse egestas ante id quam placerat, sed tristique nibh sollicitudin. Donec posuere neque a semper sagittis. Vivamus sit amet consectetur lectus, ac efficitur orci. Sed ultricies nisi eget justo semper, et dictum lacus eleifend. Duis tristique ipsum erat, id bibendum nisl tempus id. Quisque sed convallis leo. In sodales feugiat lacus, id iaculis orci mollis et. Duis id arcu purus. Phasellus faucibus rhoncus nisl, vel condimentum nibh. Morbi ornare accumsan convallis. Curabitur quis sapien posuere nisi imperdiet elementum eget in nunc. Sed magna est, vehicula ut viverra id, egestas eu est. Quisque accumsan dolor id felis viverra, et maximus risus aliquet.\n \n" +
    //   "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed purus turpis, tincidunt vitae laoreet nec, feugiat non libero. Praesent pharetra hendrerit elit, eu tincidunt felis egestas ac. Pellentesque finibus bibendum aliquet. Mauris eu sodales neque, id porttitor justo. Etiam mollis feugiat pharetra."},
    //   {title: "Consequences", content: "Duis vehicula justo nec nisi feugiat tincidunt. Ut quis egestas est. Duis in aliquet ipsum. Quisque blandit, risus nec vehicula mollis, nisi felis vestibulum purus, et maximus purus libero sit amet mauris. Fusce sagittis bibendum ex.\n\n" + 
    //   "Nunc accumsan nisi sed elit posuere, rutrum ullamcorper urna luctus. Etiam in posuere justo, ac gravida massa. In elementum massa vitae augue feugiat varius. Donec mollis lorem mi, ac maximus odio sollicitudin pellentesque. Nullam lacinia dolor non nunc facilisis rhoncus. Vivamus blandit mauris eget ante feugiat, in finibus mauris tempor. Donec ut risus quis tellus efficitur sollicitudin. Integer vulputate luctus molestie.\n \n" +
    //     "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras non vehicula ligula, dignissim elementum metus. Maecenas ac ullamcorper nibh. Integer imperdiet sagittis condimentum. Aliquam cursus ut erat ut gravida. Pellentesque scelerisque in massa quis pharetra."}]}, 
    // {id:1, title:"Indirect Execution of Unknown Code", 
    //   matrix: [
    //     {title : "Overall Risk Level", reading : 4.5},
    //     {title : "Likelihood Level", reading : 2.3},
    //     {title : "Impact Level", reading : 4.8}],
    //   description:[
    //   {title: "Description", content: "Aliquam erat volutpat. Cras id viverra est. Pellentesque non maximus arcu, a rhoncus dui. Phasellus sit amet scelerisque erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\n" + 
    //   "Etiam in posuere justo, ac gravida massa. In elementum massa vitae augue feugiat varius. Donec mollis lorem mi, ac maximus odio sollicitudin pellentesque. Nullam lacinia dolor non nunc facilisis rhoncus. Vivamus blandit mauris eget ante feugiat, in finibus mauris tempor.\n \n" +
    //   "Etiam molestie efficitur libero. Cras faucibus vel quam id vestibulum. Mauris eget congue quam, et elementum felis. Aenean facilisis, velit vel tempor sollicitudin, metus nibh posuere nisl, eu sodales arcu lacus at est. Curabitur id gravida ipsum. Duis vehicula justo nec nisi feugiat tincidunt. Ut quis egestas est. Duis in aliquet ipsum. Quisque blandit, risus nec vehicula mollis, nisi felis vestibulum purus, et maximus purus libero sit amet mauris. Fusce sagittis bibendum ex."},
    //   {title: "Consequences", content: "Nunc accumsan nisi sed elit posuere, rutrum ullamcorper urna luctus. Etiam in posuere justo, ac gravida massa. In elementum massa vitae augue feugiat varius. Donec mollis lorem mi, ac maximus odio sollicitudin pellentesque. Nullam lacinia dolor non nunc facilisis rhoncus. Vivamus blandit mauris eget ante feugiat, in finibus mauris tempor.\n\n" + 
    //   "Praesent interdum, massa vitae viverra mollis, neque erat feugiat magna, bibendum venenatis leo massa vulputate ante. Etiam vestibulum imperdiet ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras non vehicula ligula, dignissim elementum metus. Maecenas ac ullamcorper nibh. Integer imperdiet sagittis condimentum. Aliquam cursus ut erat ut gravida. Pellentesque scelerisque in massa quis pharetra. \n \n" +
    //     "Duis in aliquet ipsum. Quisque blandit, risus nec vehicula mollis, nisi felis vestibulum purus, et maximus purus libero sit amet mauris. Fusce sagittis bibendum ex."}]}, 
    // {id:2, title:"Replay Signature", 
    //   matrix: [
    //     {title : "Overall Risk Level", reading : 3.9},
    //     {title : "Likelihood Level", reading : 3.5},
    //     {title : "Impact Level", reading : 3.7}],
    //   description:[
    //     {title: "Description", content: "Mauris eget congue quam, et elementum felis. Aenean facilisis, velit vel tempor sollicitudin, metus nibh posuere nisl, eu sodales arcu lacus at est. Curabitur id gravida ipsum. Duis vehicula justo nec nisi feugiat tincidunt. Ut quis egestas est.\n\n" + 
    //     "Etiam in posuere justo, ac gravida massa. In elementum massa vitae augue feugiat varius. Donec mollis lorem mi, ac maximus odio sollicitudin pellentesque. Nullam lacinia dolor non nunc facilisis rhoncus. Vivamus blandit mauris eget ante feugiat, in finibus mauris tempor.\n \n" +
    //     "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras non vehicula ligula, dignissim elementum metus. Maecenas ac ullamcorper nibh. Integer imperdiet sagittis condimentum. Aliquam cursus ut erat ut gravida. Pellentesque scelerisque in massa quis pharetra. Aliquam erat volutpat. Cras id viverra est. Pellentesque non maximus arcu, a rhoncus dui. Phasellus sit amet scelerisque erat."},
    //     {title: "Consequences", content: "Nullam lacinia dolor non nunc facilisis rhoncus. Vivamus blandit mauris eget ante feugiat, in finibus mauris tempor. Donec ut risus quis tellus efficitur sollicitudin. Integer vulputate luctus molestie. Praesent interdum, massa vitae viverra mollis, neque erat feugiat magna, bibendum venenatis leo massa vulputate ante.\n\n" + 
    //     "Cras non vehicula ligula, dignissim elementum metus. Maecenas ac ullamcorper nibh. Integer imperdiet sagittis condimentum. Aliquam cursus ut erat ut gravida. Pellentesque scelerisque in massa quis pharetra. Aliquam erat volutpat. Cras id viverra est. Pellentesque non maximus arcu, a rhoncus dui. Phasellus sit amet scelerisque erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n \n" +
    //     "Cras faucibus vel quam id vestibulum. Mauris eget congue quam, et elementum felis. Aenean facilisis, velit vel tempor sollicitudin, metus nibh posuere nisl, eu sodales arcu lacus at est. Curabitur id gravida ipsum. Duis vehicula justo nec nisi feugiat tincidunt. Ut quis egestas est. Duis in aliquet ipsum. Quisque blandit, risus nec vehicula mollis, nisi felis vestibulum purus, et maximus purus libero sit amet mauris. Fusce sagittis bibendum ex."}]}
    
  var [percentage, setPercentage] = useState(66)

  
  // console.log("existing contracts > " + contracts)
  const setContractsHandler = (new_contracts) => {
    // console.log("new contracts > " + new_contracts)
    setContracts([...contracts, ...new_contracts])
  }
  // console.log(contracts)
  const removeFile = (filename) => {
    setContracts(contracts.filter(file => file.name !== filename))
  }

  //delete file
  const deleteFileHandler = (_index) => {
    // console.log(_index)
    // console.log(contracts)
    // acceptedFiles.splice(_index, 1)
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
              content: <ContractUploader contracts={contracts} setContractsHandler={setContractsHandler} deleteFileHandler={deleteFileHandler} />,
              validator: step1Validator
            },
            {
              label: 'Vulnerability',
              name: 'step 2',
              content: <VulnerabilityPicker />,
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