import React from "react";
import Header from "./header";
import Card from 'react-bootstrap/Card';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';

function Welcome() {
    return (
      <div>
        <div style={{marginLeft:"33rem"}}>
            <Header />
        </div>
        <Card style={styles.screenContainer}>
        <Card.Body style={{height:'250px'}} >
          <Card.Title>Welcome To Tool "Name" </Card.Title>
          <Card.Subtitle className="mb-2 text-muted"style={{lineHeight: 2.5}} >Detect Smart Contracts Vulnerabilities Here</Card.Subtitle>
          <Card.Text>
            Curabitur faucibus pellentesque ipsum at volutpat. Pellentesque nec fringilla lacus, nec blandit orci. Morbi ultricies interdum gravida. Aliquam ligula ante, rutrum a justo vel
          </Card.Text>
          <Card.Link style={{marginTop:'15px'}} href="scan_and_view_content" className="btn btn-primary">Lets Get Started</Card.Link>
        </Card.Body>
      </Card>
      </div>
      
    )
}

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