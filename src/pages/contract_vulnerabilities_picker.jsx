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
    document.getElementsByClassName("_hsN1w")[0].style.display = "none"
    getDetectors();
  }, [])

  // due to asyn traits, the detectors is not stored persistently
  const getDetectors = () => {
    axios.get('http://127.0.0.1:5000/detectors')
    .then((res) => {
      // console.log(res.data)
      setDetectors(res.data)
    })
    .catch((err) => {
        // inform the user
        console.error(err)
    })
  }

  const vulnerabilityListItem = detectors && detectors.map(v => {
    if (v[0].id === '' && detectors.length%2 === 0){
      // true when length is even and the id is null ''
      // because need an empty li when the detectors return is odd to enhance display purpose
      return (
        <li
          style={{backgroundImage:"unset", backgroundColor: "unset", cursor: "initial"}}
          key={v[0].id}
          id={v[0].id}>
        </li>
      )
    } else {
      if (v[0].id !== ''){
        // recheck and only print when the id is not null ''
        return (
          <li
            key={v[0].id}
            id={v[0].id}
            className="vulnerability"
            onClick={() => setShowDetector(v)}>
            <p>{firstLetterUppercase(v[0].id, '_', ' ')}</p>
          </li>
        )
      }
      return <></>
    }
  });

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