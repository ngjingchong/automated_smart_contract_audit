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
      <div style={{ marginLeft: "33rem" }} > <Header /> </div>
      <Button style={{ marginLeft: '350%', marginTop: '50px' }} onClick={() => setIsTourOpen(true)} className="btn-primary"> Tour </Button>
      <Card id="body" style={styles.screenContainer}>
        <Card.Body style={{ height: '250px' }} >
          <Card.Title>Welcome To Tool "Name" </Card.Title>
          <Card.Subtitle className="mb-2 text-muted" style={{ lineHeight: 2.5 }} >Detect Smart Contracts Vulnerabilities Here</Card.Subtitle>
          <Card.Text>
            Curabitur faucibus pellentesque ipsum at volutpat. Pellentesque nec fringilla lacus, nec blandit orci. Morbi ultricies interdum gravida. Aliquam ligula ante, rutrum a justo vel
          </Card.Text>
          <Card.Link id="button" style={{ marginTop: '15px' }} href="scan_and_view_content" className="btn btn-primary">Lets Get Started</Card.Link>
        </Card.Body>
      </Card>
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />
    </>
  )
}

const steps = [
  {
    selector: "#heading",
    content: "This is my first step",
  },
  {
    selector: "#body",
    content: "This is my second step",
  },
  {
    selector: "#button",
    content: "This is my third step",
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
  }
});

export default Welcome;