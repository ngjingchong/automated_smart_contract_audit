import logo from './../logo.svg';
import './contract_vulnerabilities_picker.scss';
import React, { useState } from "react";
import VulnerabilityDetails from './contract_vulnerability_details';

const VulnerabilityPicker = ({vulnerabilities}) => {
  const [vulnerability, setVulnerability] = useState()
  const [vulnerabilitiesLiked, setVulnerabilitiesLiked] = useState([])
  const [auditorPicked, setAuditor] = useState()

  const vulnerabilityListItem = vulnerabilities && vulnerabilities.map(v => (
    <li
      key={v.id}
      id={v.id}
      className="vulnerability"
      onClick={() => setVulnerability(v)}>
      <p>{v.title}</p>
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