import React, { useState } from "react";
import Tour from 'reactour'
import Header from "./header";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { StyleSheet } from 'react-native';

function Welcome() {

  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <>
      <Header />
      <Card id="body" style={styles.screenContainer}>
        <Card.Body style={{ height: '250px' }} >
          <Card.Title>Welcome To XContract Saviour</Card.Title>
          <Card.Subtitle className="mb-2 text-muted" style={{ lineHeight: 2.5 }}>Fix Your Smart Contract Here!</Card.Subtitle>
          <Card.Text style={{ lineHeight: "35px" }}>
            <b>XContract Saviour Tool may assist you in detecting vulnerabilities in your Smart Contract! <p>We are here to save you from losing millions of dollars.</p></b>
          </Card.Text>
          <Card.Link id="button" style={{ marginTop: '15px' }} href="audit_process" className="btn btn-primary">Lets Get Started</Card.Link>
        </Card.Body>
      </Card>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />
      <Button style={styles.tourGuideButton} onClick={() => setIsTourOpen(true)}>Tour Guide</Button>
    </>
  )
}

const steps = [
  {
    selector: "#heading",
    content: "Welcome to XContract Saviour!",
  },
  {
    selector: "#body",
    content: "You are currently on our Home Page.",
  },
  {
    selector: "#button",
    content: "Click this button to start scanning your Smart Contract!",
  },
];

const styles = StyleSheet.create({
  screenContainer: {
    width: '900px',
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: "30px"
  },
  centerItem: {
    position: "absolute",
    top: "0%",
    left: "50%",
    marginLeft: "-120px"
  },
  tourGuideButton: {
    fontWeight: "bold", backgroundColor: "#78909c", bottom: 0, margin: 20, position: "fixed", right: 20, borderRadius: "50%", height: 90, width: 90
  }
});

export default Welcome;