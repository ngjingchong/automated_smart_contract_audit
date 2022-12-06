import logo from './../logo.svg';
import './contract_vulnerabilities_picker.scss';
import React, { useState, useEffect } from "react";
import VulnerabilityDetails from './contract_vulnerability_details';
import axios from 'axios'
import { firstLetterUppercase } from './helpers'

const VulnerabilityPicker = () => {
  const [vulnerability, setVulnerability] = useState()
  const [vulnerabilitiesLiked, setVulnerabilitiesLiked] = useState([])
  const [auditorPicked, setAuditor] = useState()
  const [detectors, setDetectors] = useState([])

  useEffect(() => { // run whenever user liked an detectors
    console.log(vulnerabilitiesLiked)
  },[vulnerabilitiesLiked])
  useEffect(() => { // run when user picked an detector to scan against their smart contracts
    if (auditorPicked) {
      window.confirm("start scanning your smart contracts agains > " + auditorPicked + "?")
    }
    console.log(auditorPicked)
  },[auditorPicked])
  useEffect(() => { //get detectors on first render of this component
    getDetectors();
  }, [])

  // due to asyn traits, the detectors is not stored persistently
  const getDetectors = () => {
    axios.get('/detectors')
    .then((res) => {
      // console.log(res.data)
      setDetectors(res.data)
    })
    .catch((err) => {
        // inform the user
        console.error(err)
    })
  }

  const vulnerabilityListItem = detectors && detectors.map(v => (
    <li
      key={v[0].id}
      id={v[0].id}
      className="vulnerability"
      onClick={() => setVulnerability(v)}>
      <p>{firstLetterUppercase(v[0].id, '_', ' ')}</p>
    </li>
  ));

  function vulnerabilitiesMenu() {
    //Show all vulnerability auditor available if no specific vulnerability is setted
    if (vulnerability) {
      const back = () => {
        setVulnerability("")
      }
      const like_vulnerability = (vulnerability) => {
        setVulnerabilitiesLiked([...vulnerabilitiesLiked, vulnerability])
      }
      const scan_vulnerability = (vulnerabilityAuditorPicked) => {
        setAuditor(vulnerabilityAuditorPicked)
      }

      return <VulnerabilityDetails vulnerability={vulnerability} back={back} like_vulnerability={like_vulnerability} scan_vulnerability={scan_vulnerability} />
    
    } else {
      return (
        <div className="vulnerability_picker_container">
          <aside className='vulnerabilities_container'>
            <ul className='vulnerability_col'>{vulnerabilityListItem}</ul>
          </aside>
        </div>
      )
    }
  };

  return (
    <div>
      {vulnerabilitiesMenu()}
    </div>
  )
}

export default VulnerabilityPicker;