import React, {Component } from "react";
import Header from "./header";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import './audit_process.css';

import ContractUploader from './contract_uploader';
import VulnerabilityPicker from './contract_vulnerabilities_picker';
import VulnerabilityDetails from './contract_vulnerability_details';
import AuditReport from './contract_audit_report';

// setup step validators, will be called before proceeding to the next step
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

class Audit_Process extends Component {
    render() {
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
                  content: <ContractUploader/>
                },
                {
                  label: 'Vulnerability',
                  name: 'step 2',
                  content: <VulnerabilityPicker/>,
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
                  name: 'step 3',
                  content: <AuditReport/>,
                  validator: step3Validator
                }
              ]}
            />
          </div>
        </div>
      )
    }
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