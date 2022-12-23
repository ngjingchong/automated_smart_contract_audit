import { React, useEffect, useState, useRef, Component } from "react";
import { StyleSheet } from 'react-native';
import { useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import Button from 'react-bootstrap/Button';

const PrintReport = () => {

    const { state } = useLocation();
    console.log(state)
    const [notes, setNotes] = useState([]);
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        
        setNotes(state.results.detectors);
        for (let k = 0; k < notes.length; k++) {
            if (notes[k].elements.length !== 0) {
                setFileName(state.results.detectors[k].elements[k].source_mapping.filename_relative)
                setFileName(fileName.toString.replaceAll('contracts/', ''))
            }
        }
    }, []);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div style={styles.screenContent}>
            <div style={styles.centerContent}>

                <Button variant="primary" onClick={handlePrint} style={{ marginTop: "30px", float: "right" }}>Print this out!</Button>
                <div ref={componentRef}>
                    <div style={{ textDecoration:"underline", marginLeft:"30px", marginTop: "100px" }}>
                        <h3>{fileName.replace('contracts/', '')} Report</h3>
                    </div>
                    {notes.map((note) => {
                        console.log(note)
                        return (
                            <div>
                                <div className="card" style={styles.card}>
                                    <h3 style={styles.titleText}>{note.check}</h3>
                                    <p><b>Impact:</b> {note.impact}</p>
                                    <p><b>Description:</b><br />{note.description.replaceAll('contracts/', '').replaceAll('#', ' line - ')} </p>
                                    {note.elements.map((element) => {
                                        return (
                                            <ul>
                                                <li>
                                                    <p><b>Name: </b>{element.name}</p>
                                                </li>
                                                <p><b>Type: </b>{element.type}</p>
                                                <p><b>Line(s): </b></p>
                                                <ul>
                                                    {element.source_mapping.lines.map((line) => {
                                                        return (<li>
                                                            {line}
                                                        </li>)
                                                    })}
                                                </ul>
                                            </ul>
                                        )
                                    })}
                                    <p><b>Repair Confidency:</b> {note.confidence}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div >
    )
}

const styles = StyleSheet.create({

    centerContent: {
        display: "block", justifyContent: "center", paddingTop: "25px"
    },

    screenContent: {
        position: 'absolute', left: '50%', marginTop:"100%", transform: 'translate(-50%, -50%)', padding: "9px",
    },

    card: {
        borderRadius: "10px",
        backgroundColor: "rgb(247, 247, 247)",
        color: "rgb(87, 87, 87)",
        width: "600px",
        float: "left",
        margin: "3%",
        padding: "15px",

    },

    titleText: {
        textAlign: "center",
        textDecoration: "underline",
        textTransform: "uppercase"
    }

});

export default PrintReport;
