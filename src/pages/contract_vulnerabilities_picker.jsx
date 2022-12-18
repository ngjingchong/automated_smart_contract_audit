import logo from './../logo.svg';
import './contract_vulnerabilities_picker.scss';
import React, { useState, useEffect } from "react";
import VulnerabilityDetails from './contract_vulnerability_details';
import axios from 'axios'
import { firstLetterUppercase } from './helpers'

const VulnerabilityPicker = ({detectorSelected, set_scan_vulnerability}) => {
  set_scan_vulnerability()
  const [showDetector, setShowDetector] = useState()
  const [detectors, setDetectors] = useState([])
  const [vulnerabilitiesLiked, setVulnerabilitiesLiked] = useState([])

  // useEffect(() => { // run whenever user liked an detectors
  //   // console.log(vulnerabilitiesLiked)
  // },[vulnerabilitiesLiked])
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
      onClick={() => setShowDetector(v)}>
      <p>{firstLetterUppercase(v[0].id, '_', ' ')}</p>
    </li>
  ));

  function vulnerabilitiesMenu() {
    //Show all vulnerability auditor available if no specific vulnerability is setted
    if (showDetector) {
      const back = () => {
        setShowDetector("")
      }
      
      const set_like_vulnerability = (vulnerability) => {
        // console.log(vulnerability)
        // check if the state contains object
        const isFound = vulnerabilitiesLiked.some(element => {
          if (element === vulnerability)
            return true;
          return false;
        });

        // action acts according to the existence of the object
        if (isFound) {
          // filter out the element existed in the state & update the state
          setVulnerabilitiesLiked(() => vulnerabilitiesLiked.filter((v) => v !== vulnerability))
        } else {
          // element is not existed in current state & append it into current state 
          setVulnerabilitiesLiked([...vulnerabilitiesLiked, vulnerability])
        }
      }
      return <VulnerabilityDetails showDetector={showDetector} back={back} vulnerabilitiesLiked={vulnerabilitiesLiked} set_like_vulnerability={set_like_vulnerability} set_scan_vulnerability={set_scan_vulnerability} />
    
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