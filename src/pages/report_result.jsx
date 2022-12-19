import { React, useEffect, useState } from "react";
import Header from "./header";
import Table from 'react-bootstrap/Table';
import pdfLogo from '../images/pdfLogo.png';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import Swal from 'sweetalert2';
import Tour from 'reactour'

function ReportResult() {

    const [isTourOpen, setIsTourOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [items, setItems] = useState([]);
    const [percentage, setPercentage] = useState(0);

    let slicePath = items.toString().replace('src/contracts/', '');
    let chngType = slicePath.replace('sol', 'pdf');

    useEffect(() => {
        getAllNotes();
        setPercentage(((highCount / totalErr) * 50) + ((mediumCount / totalErr) * 30) + ((minorCount / totalErr) * 15) + ((infoCount / totalErr) * 5))
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    function getAllNotes() {

        axios.get('http://127.0.0.1:5000/data')
            .then((res) => {
                setNotes(res.data.results.detectors);
                setItems(res.data.results.detectors[0].elements[0].source_mapping.filename_relative);
            })
            .catch((err) => {
                console.error(err)
            })
    }

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
                let slicePath = notes[j].description.replaceAll('src/contracts/Reentrancy.sol', 'line ');
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
                    for (let m = 0; m < currently[p].source_mapping.lines.length; m++) {
                        allLines.push(currently[p].source_mapping.lines[m])
                    }
                    arraySeq[p] = new Array(allLines)
                    allLines = [];
                }
            }
        }
        let k
        let result
        if (currently.length != 0) {

            for (k = 0; k < currently.length;) {
                // console.log(arraySeq[k])
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

    function printExternal(url) {
        // var printWindow = window.open('../automated_smart_contract_audit/public/contracts/Reentrancy.sol');

        // printWindow.addEventListener('load', function () {
        //     if (Boolean(printWindow.chrome)) {
        //         printWindow.print();
        //         setTimeout(function () {
        //             printWindow.close();
        //         }, 500);
        //     } else {
        //         printWindow.print();
        //         printWindow.close();
        //     }
        // }, true);
    }

    return (
        <div>
            <div style={{ marginLeft: "33rem" }}>
                <Header />
            </div>
            <Button style={{ marginLeft: '350%', marginTop: '50px' }} onClick={() => setIsTourOpen(true)} className="btn-primary"> Tour </Button>

            <div style={styles.screenContent}>
                <div style={styles.centerContent}>
                    <img src={pdfLogo} className="pdf_logo" alt="logo" style={{ width: "5rem", height: "5rem" }} />
                    <div className="ms-2 me-auto">
                        <div><Button style={{ fontWeight: 'bolder' }} variant="text" onClick={() => printExternal('../public/contracts/'+ slicePath)}>{chngType}</Button></div>
                        Date Audited: {<br />} Vulnerability:
                    </div>

                </div>
                <span>Report Severity: </span>
                <div id="percentage" style={{ width: 100, position: 'relative' }}>
                    <CircularProgressbar value={percentage} text={`${percentage}%`} />
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
                <Table style={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0px 4px' }}>
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
        </div >
    )
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
        content: "The percentage shows how dangerous of the smart contract is",
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
        display: "flex", justifyContent: "center"
    },

    screenContent: {
        position: 'absolute',
        left: '50%',
        top: '20.5rem',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "white",
        padding: "9px",
        maxHeight: "400px",
        overflowY: "scroll",
    },

    severityContainer: {
        display: "flex", justifyContent: "center", marginTop: "10px"
    },

    titleContainer: {
        marginBottom: "5px", marginTop: "10px", fontWeight: "bold"
    }

});

export default ReportResult;
