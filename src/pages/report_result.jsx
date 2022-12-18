import React from "react";
import { useEffect, useState } from "react";
import Header from "./header";
import Table from 'react-bootstrap/Table';
import pdfLogo from '../images/pdfLogo.png';
import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import Swal from 'sweetalert2';
import Tour from 'reactour'

function ReportResult() {

    const [isTourOpen, setIsTourOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getAllNotes();
        console.log(items)
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    function getAllNotes(){
        
        axios.get('http://127.0.0.1:5000/data')
            .then((res) => {
                setNotes(res.data.results.detectors);
                setItems(res.data.results.detectors[0].elements[0].source_mapping.filename_relative);
            })
            .catch((err) => {
                console.error(err)
            })
    }

    var highCount = 0, mediumCount = 0, minorCount = 0, infoCount = 0, optiCount = 0;

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

    const severity = [
        { count: highCount, label: 'High', color: 'danger' },
        { count: mediumCount, label: 'Medium', color: 'warning' },
        { count: minorCount, label: 'Minor', color: 'primary' },
        { count: infoCount, label: 'Informational', color: 'info' },
        { count: optiCount, label: 'Optimization', color: 'dark' }
    ]

    //display detail
    const severityDetails = (_id) => { 
        for (let j = 0; j < notes.length; j++) {
            console.log(notes.length)
            if (notes[j].id == _id) {
                Swal.fire({
                    title: "Severity Details",
                    text: notes[j].description,
                    confirmButtonText: "OK",
                });
                break
            }
        }
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
                        <div className="fw-bold">Smart Contract Report .pdf</div>
                        Date Audited: {<br />} Vulnerability:
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
                <Table>
                    <thead style={{ textAlign: "center" }}>
                        <tr>
                            <th id="title">Title</th>
                            <th id="severity">Severity</th>
                            <th id="problem">Problem(s)</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                        {notes.map((note, index) => {
                            return (
                                <tr key={index}>
                                    <td>{note.check}</td>
                                    <td>{note.impact}</td>
                                    <td ><FontAwesomeIcon
                                        icon={faCircleInfo}
                                        onClick={() => severityDetails(note.id)} />
                                    </td>
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
        </div>
    )
}

const steps = [
    {
        selector: "#title",
        content: "Here mentions the title of the problem found in the smart contract",
    },
    {
        selector: "#severity",
        content: "Here shows how dangerous the problem will cause to the smart contract",
    },
    {
        selector: "#problem",
        content: "Click on the icon for description",
    },
];

const styles = StyleSheet.create({

    centerContent: {
        display: "flex", justifyContent: "center"
    },

    screenContent: {
        width: '50%',
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
