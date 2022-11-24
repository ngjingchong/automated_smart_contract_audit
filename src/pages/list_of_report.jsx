import ListGroup from 'react-bootstrap/ListGroup';
import React, { Component }  from 'react';
import pdfLogo from '../images/pdfLogo.png';
import { Button, StyleSheet } from 'react-native';

function ListOfReport() {
  const reports = [  
    {  
      'name': 'smart-contract-report-name1.pdf',   
      'date': '09/05/2022'  
    },  
    {  
      'name': 'smart-contract-report-name2.pdf',   
      'date': '19/05/2022'  
    },  
    {  
      'name': 'smart-contract-report-name3.pdf',   
      'date': '29/05/2022'  
    },  
    {  
      'name': 'smart-contract-report-name1.pdf',   
      'date': '09/05/2022'  
    },  
    {  
      'name': 'smart-contract-report-name1.pdf',   
      'date': '09/05/2022'  
    },  
    {  
      'name': 'smart-contract-report-name2.pdf',   
      'date': '19/05/2022'  
    },  
    {  
      'name': 'smart-contract-report-name3.pdf',   
      'date': '29/05/2022'  
    },  
  ]; 

// Note: report name and date have to get from session

  return (
    <ListGroup style={styles.listGroup}>
        {reports.map((report)=> (
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <img src={pdfLogo} className="pdf_logo" alt="logo" style={{width:"3rem", height:"3rem"}}/>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{report.name}</div> 
              Uploaded {report.date}
            </div>
            <ListGroup.Item action href="report_result" style={styles.scanButton}>
                Read
            </ListGroup.Item>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    width: "5rem", 
    height: "2rem", 
    backgroundColor: '#24a0ed', 
    alignItems: 'center', 
    display: 'flex', 
    borderRadius: 3, 
    textAlign:'center', 
    color:"white", 
    textTransform:"uppercase"
  },

  listGroup: {
    maxHeight: "380px",
    overflowY:"scroll",
  }
});

export default ListOfReport;