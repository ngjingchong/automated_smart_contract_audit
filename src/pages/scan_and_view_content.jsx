import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ListOfContract from './list_of_contract';
import ListOfReport from './list_of_report';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { StyleSheet } from 'react-native';
import Header from "./header";

function ScanAndViewContent() {
  return (
    <>
      <Header />
      <div style={styles.listContainer}>
        <Tabs fill>
          <Tab eventKey="contract" title="Contract">
            <ListOfContract/>
          </Tab>
          <Tab eventKey="report" title="Report">
            <ListOfReport/>
          </Tab>
        </Tabs>
      </div>
    </>
    )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '550px', 
    position: 'absolute',
    left: '50%',
    top: '60%',
    transform: 'translate(-50%, -50%)',
  }
});

export default ScanAndViewContent