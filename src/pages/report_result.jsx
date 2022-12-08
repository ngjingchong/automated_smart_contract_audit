import React from 'react';
import Header from "./header";
import Table from 'react-bootstrap/Table';
import pdfLogo from '../images/pdfLogo.png';
import { AppRegistry, Button, StyleSheet, View } from 'react-native';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Records from '../result.json';

function ReportResult() {

    const severity = [
        { label: 'Critical', color: 'danger' },
        { label: 'Major', color: 'warning' },
        { label: 'Medium', color: 'primary' },
        { label: 'Minor', color: 'info' },
        { label: 'Informational', color: 'dark' }
    ]

    return (
        <div>
            <div style={{ marginLeft: "33rem" }}>
                <Header />
            </div>
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
                        <Badge bg={variant.color} style={{ margin: "15px" }}>
                            1 - {variant.label}
                        </Badge>
                    ))}
                </div>

                <p style={styles.titleContainer}>
                    Vulnerabilities Descriptions
                </p>

                {
                    Records.map( record => {
                        return (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Severity</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )
                    })
                }

            </div>
        </div>
    )
}

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
