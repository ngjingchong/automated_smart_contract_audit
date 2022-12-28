import { React, useEffect, useState, useRef, Component } from "react";
import Header from "./header";
import Table from 'react-bootstrap/Table';
import noteLogo from '../images/note.png';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Swal from 'sweetalert2';
import Tour from 'reactour';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ReportResult = () => {

    const { state } = useLocation();
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.results && Object.entries(state.results).length !== 0) {
            setNotes(state.results.detectors);
            setPercentage(totalPercentage)
        }
        else {
            setPercentage(0)
        }
    }, [percentage]);

    var highCount = 0, mediumCount = 0, minorCount = 0, infoCount = 0, optiCount = 0

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].impact == 'High') {
            highCount += 1
        }
        else if (notes[i].impact == 'Medium') {
            mediumCount += 1
        }
        else if (notes[i].impact == 'Minor') {
            minorCount += 1
        }
        else if (notes[i].impact == 'Informational') {
            infoCount += 1
        }
        else if (notes[i].impact == 'Optimization') {
            optiCount += 1
        }
    }

    let totalErr = highCount + mediumCount + minorCount + infoCount + optiCount;
    let totalPercentage = ((highCount / totalErr) * 50) + ((mediumCount / totalErr) * 30) + ((minorCount / totalErr) * 15) + ((infoCount / totalErr) * 5) + ((optiCount / totalErr) * 0)

    const severity = [
        { count: highCount, label: 'High', color: 'danger' },
        { count: mediumCount, label: 'Medium', color: 'warning' },
        { count: minorCount, label: 'Minor', color: 'primary' },
        { count: infoCount, label: 'Informational', color: 'info' },
        { count: optiCount, label: 'Optimization', color: 'dark' }
    ]

    //display desciption
    const severityDetails = (_id) => {
        for (let j = 0; j < notes.length; j++) {
            if (notes[j].id == _id) {
                console.log(notes[j])
                let slicePath = notes[j].description;
                let formatted = slicePath.replaceAll('\n\t', ' <br> \t')
                Swal.fire({
                    title: "Severity Description",
                    html: formatted + "<br><br>Repair Confidency: <b>" + notes[j].confidence + "<b>",
                    confirmButtonText: "OK",
                });
                break
            }
        }
    }

    //display error
    const severityFoundAt = async (_id) => {

        let currentStep;
        let currently;
        let allLines = [];
        let arraySeq = new Array();

        const swalQueueStep = Swal.mixin({
            confirmButtonText: 'Next',
            cancelButtonText: 'Back',
            reverseButtons: true,
        })

        for (currentStep = 0; currentStep < notes.length; currentStep++) {
            if (notes[currentStep].id == _id) {
                currently = notes[currentStep].elements
                for (let p = 0; p < currently.length; p++) {
                    if (currently.length !== 0) {
                        for (let m = 0; m < currently[p].source_mapping.lines.length; m++) {
                            allLines.push(currently[p].source_mapping.lines[m])
                        }
                        arraySeq[p] = new Array(allLines)
                        allLines = [];
                    }
                    else {
                        arraySeq[p] = "none"
                        allLines = [];
                    }
                }
            }
        }
        let k
        let result
        if (currently.length != 0) {

            for (k = 0; k < currently.length;) {
                result = await swalQueueStep.fire({
                    showCloseButton: true,
                    confirmButtonText: 'NEXT/OK',
                    cancelButtonText: 'Back',
                    reverseButtons: true,
                    title: 'Error Found',
                    html: "Error Type: <b>" + currently[k].type + "</b><br>Error Name: <b>" + currently[k].name + "</b><br>Error Line At: <b>" + arraySeq[k] + "</b>",
                    showCancelButton: k > 0,
                    currentProgressStep: k
                })

                if (result.value) {
                    k++
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    k--
                } else {
                    break
                }
            }
        }
        else {
            swalQueueStep.fire({
                showCloseButton: true,
                confirmButtonText: 'AWESOME',
                title: 'NO WORRIES',
                html: "No Specific Error!<br> See Recommendation at Severity Detail Section",
            })
        }
    }

    //display solution
    const solution = (_check) => {
        for (let i = 0; i < recommendation.length; i++) {
            if (_check == recommendation[i].check) {
                window.open(recommendation[i].link)
                break
            }
        }
    }

    const handlePrint = () => {
        navigate('../print_report', { state: state });
    }

    if (notes.length > 0) {
        return (
            <div id="reportNow">
                <Header />
                <div style={styles.screenContent}>
                    <div style={styles.centerContent}>
                        <Button variant="text" onClick={handlePrint}><img src={noteLogo} id="downloadPDF" alt="logo" style={styles.noteImg} /></Button>
                        <div style={{ marginTop: 70 }} className="ms-2 me-auto">
                            <h3>Final Results</h3>
                        </div>
                        <div style={{ marginRight: "75px", width: 130 }}>
                            <div id="percentage">
                                <CircularProgressbar value={percentage} text={`${percentage}%`} />
                            </div>
                            <p style={{ textAlign: "center", marginTop: "5px" }}><b>Contract Severity</b></p>
                        </div>
                    </div>

                    <div style={styles.severityContainer}>
                        {severity.map((variant) => (
                            <Badge key={variant.color} bg={variant.color} style={{ margin: "15px" }}>
                                {variant.count} - {variant.label}
                            </Badge>
                        ))}
                    </div>

                    <p style={styles.titleContainer}>
                        Vulnerabilities Descriptions
                    </p>
                    <Table style={styles.styleTable}>
                        <thead style={{ textAlign: "center" }}>
                            <tr>
                                <th id="title">Title</th>
                                <th id="severity">Severity</th>
                                <th id="problem">Recommendation</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            {notes.map((note, index) => {
                                let color = note.impact === "High" ? '#feb9b9' :
                                    note.impact === "Medium" ? '#ffcc80' :
                                        note.impact === "Minor" ? '#90caf9' :
                                            note.impact === 'Informational' ? '#d0fefe' : '#d8dcd6';
                                return (
                                    <tr key={index} style={{ backgroundColor: color }}>
                                        <td><Button style={{ fontWeight: 'bolder' }} variant="text" onClick={() => severityFoundAt(note.id)}>{note.check}</Button></td>
                                        <td><Button style={{ fontWeight: 'bolder' }} variant="text" onClick={() => severityDetails(note.id)}>{note.impact}</Button></td>
                                        <td><Button variant="text" onClick={() => solution(note.check)}><FontAwesomeIcon icon={faCircleInfo} /></Button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <Tour
                    steps={steps}
                    isOpen={isTourOpen}
                    onRequestClose={() => setIsTourOpen(false)}
                />
                <Button style={styles.tourGuideButton} onClick={() => setIsTourOpen(true)}>Tour Guide</Button>
            </div >
        )
    }
    else {
        return (
            <div id="reportNow">
                <Header />
                <div style={styles.screenContent}>
                    <div style={styles.centerContent}>
                        <div style={{ marginRight: "75px", width: 130 }}>
                            <div id="percentage">
                                <CircularProgressbar value={percentage} text={`${percentage}%`} />
                            </div>
                            <p style={{ textAlign: "center", marginTop: "5px" }}><b>No Vulnerability</b></p>
                        </div>
                    </div>

                    <div style={styles.severityContainer}>
                        {severity.map((variant) => (
                            <Badge key={variant.color} bg={variant.color} style={{ margin: "15px" }}>
                                {variant.count} - {variant.label}
                            </Badge>
                        ))}
                    </div>

                    <p style={styles.titleContainer}>
                        Vulnerabilities Descriptions
                    </p>
                    <Table style={styles.styleTable}>
                        <thead style={{ textAlign: "center" }}>
                            <tr>
                                <th id="title">Title</th>
                                <th id="severity">Severity</th>
                                <th id="problem">Recommendation</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                            <tr style={{ backgroundColor: '#abf7b1' }}>
                                <td><b>none</b></td>
                                <td><b>none</b></td>
                                <td><b>none</b></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <Tour
                    steps={steps}
                    isOpen={isTourOpen}
                    onRequestClose={() => setIsTourOpen(false)}
                />
                <Button style={styles.tourGuideButton} onClick={() => setIsTourOpen(true)}>Tour Guide</Button>
            </div >
        )
    }
}

const steps = [
    {
        selector: "#title",
        content: "Click on the title from the table content to see the error(s) found in the smart contract",
    },
    {
        selector: "#severity",
        content: "Click on the severity from the table content to see its description",
    },
    {
        selector: "#problem",
        content: "Click on the icon for solution",
    },
    {
        selector: "#percentage",
        content: "Percentage shows how dangerous of the smart contract is",
    },
    {
        selector: "#downloadPDF",
        content: "Click here to see/print report documentation",
    },
];

const recommendation = [
    { check: "reentrancy-eth", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-20' },
    { check: "reentrancy-no-eth", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-38' },
    { check: "reentrancy-benign", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-56' },
    { check: "reentrancy-events", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-57' },
    { check: "reentrancy-unlimited-gas", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-75' },
    { check: "constant-function-asm", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-35' },
    { check: "constant-function-state", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-36' },
    { check: "deprecated-standards", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-62' },
    { check: "pragma", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-68' },
    { check: "solc-version", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-70' },
    { check: "protected-vars", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-6' },
    { check: "suicidal", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-10' },
    { check: "unprotected-upgrade", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-13' },
    { check: "variable-scope", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-49' },
    { check: "events-access", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-52' },
    { check: "events-maths", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-53' },
    { check: "domain-separator-collision", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-24' },
    { check: "erc20-interface", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-26' },
    { check: "erc721-interface", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-27' },
    { check: "erc20-indexed", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-63' },
    { check: "uninitialized-state", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-11' },
    { check: "uninitialized-storage", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-12' },
    { check: "uninitialized-local", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-43' },
    { check: "uninitialized-fptr-cst", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-48' },
    { check: "function-init-state", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-64' },
    // {check:  "backdoor", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration'},
    { check: "shadowing-state", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-9' },
    { check: "controlled-delegatecall", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-17' },
    { check: "shadowing-abstract", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-31' },
    { check: "tx-origin", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-40' },
    { check: "shadowing-builtin", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-46' },
    { check: "shadowing-local", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-47' },
    { check: "assembly", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-59' },
    { check: "rtlo", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-8' },
    { check: "public-mappings-nested", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-7' },
    { check: "weak-prng", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-23' },
    { check: "timestamp", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-58' },
    { check: "similar-names", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-76' },
    { check: "too-many-digits", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-77' },
    { check: "multiple-constructors", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-4' },
    { check: "name-reused", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-5' },
    { check: "write-after-write", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-33' },
    { check: "reused-constructor", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-39' },
    { check: "unused-return", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-44' },
    { check: "redundant-statements", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-69' },
    { check: "unimplemented-functions", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-71' },
    { check: "unused-state", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-72' },
    { check: "dead-code", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-74' },
    { check: "abiencoderv2-array", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration' },
    { check: "array-by-reference", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-2' },
    { check: "storage-array", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-21' },
    { check: "incorrect-shift", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-3' },
    { check: "controlled-array-length", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-16' },
    { check: "unchecked-transfer", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-22' },
    { check: "incorrect-equality", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-28' },
    { check: "locked-ether", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-29' },
    { check: "mapping-deletion", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-30' },
    { check: "divide-before-multiply", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-37' },
    { check: "unchecked-lowlevel", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-41' },
    { check: "unchecked-send", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-42' },
    { check: "incorrect-modifier", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-45' },
    { check: "incorrect-unary", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-54' },
    { check: "missing-zero-check", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-55' },
    { check: "assert-state-change", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-60' },
    { check: "missing-inheritance", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-66' },
    { check: "naming-convention", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-67' },
    { check: "constable-states", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-78' },
    { check: "external-function", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-79' },
    { check: "arbitrary-send-erc20", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-1' },
    { check: "arbitrary-send-erc20-permit", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-14' },
    { check: "arbitrary-send-eth", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-15' },
    { check: "low-level-calls", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-65' },
    { check: "enum-conversion", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-25' },
    { check: "tautology", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-32' },
    { check: "boolean-cst", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-34' },
    { check: "boolean-equal", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-61' },
    { check: "delegatecall-loop", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-18' },
    { check: "msg-value-loop", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-19' },
    { check: "calls-loop", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-51' },
    { check: "costly-loop", link: 'https://github.com/crytic/slither/wiki/Detector-Documentation#configuration-73' },
]

const styles = StyleSheet.create({

    centerContent: {
        display: "flex", justifyContent: "center", paddingTop: "25px"
    },

    screenContent: {
        marginTop: "9rem", position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)', backgroundColor: "white", padding: "9px",
    },

    noteImg: {
        marginLeft: "55px", width: "5rem", height: "5.2rem"
    },

    styleTable: {
        minWidth: 650, borderCollapse: 'separate', borderSpacing: '0px 4px'
    },

    severityContainer: {
        display: "flex", justifyContent: "center", marginTop: "10px"
    },

    titleContainer: {
        marginBottom: "5px", marginTop: "10px", fontWeight: "bold", textAlign: "center", fontSize: "18px"
    },

    tourGuideButton: {
        fontWeight: "bold", backgroundColor: "#78909c", bottom: 0, margin: 20, position: "fixed", right: 20, borderRadius: "50%", height: 90, width: 90
    }
});

export default ReportResult;
