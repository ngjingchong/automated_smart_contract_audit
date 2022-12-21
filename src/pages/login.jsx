import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import Figure from 'react-bootstrap/Figure';
// import Report_Result from './report_result';
import FacebookLogin from 'react-facebook-login';
import './login.scss'

function Login(props) {
  const {handleLogout, isFirstRender, ...prop} = props;
  const [ profile, setProfile ] = useState([]);
  const clientId = "781183867231-hlnq32efqk6dl95ivd1thhuajoo35qii.apps.googleusercontent.com"
  const clientSecret = "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"
  const fbId = "1009180366682046"

  const onSuccess = async (res) => {
    setProfile([res.profileObj]);
    // console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };

  const logOut = () => {
    setProfile([]);
    prop.onHide();
    handleLogout();
  };

  useEffect(() => {
    if (!isFirstRender){
      window.FB.init({
        appId: fbId,
        cookie: true,
        xfbml: true,
        status: true,
        version: 'v7.0'
      });
      
      // const fetchData = async () => {
      //   try {
      //     const response =  fetch('https://graph.facebook.com/me', {
      //       method: 'GET',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'Authorization': 'Bearer ' + window.localStorage.getItem('fb_access'),
      //       },
      //     });
      //     const userData =  response.json();
      //     console.log(userData);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
      // if (window.localStorage.getItem('fb_access') !== null){
      //   fetchData()
      // }
      
      window.FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          
        } else {
          // User is not logged in or has not authorized your app
        }
      });
    }

    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);

    // console.log(window.FB.getAccessToken())
  });
  
  const responseFacebook = (response) => {
    window.localStorage.setItem('fb_access', response.accessToken);
    var fb_profile = response
    fb_profile["imageUrl"] = response.picture.data.url
    
    setProfile([response]);
  }

  if (profile.length > 0) {
    return (
    <>
      <Modal {...prop} aria-labelledby="contained-modal-title-vcenter">
        {console.log(profile)}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Figure className="profile_icon">
              <Figure.Image
                style={{borderRadius: "50%", marginBottom: "unset"}}
                width={30}
                height={30}
                alt="30x30"
                src={profile[0]['imageUrl']}
                referrerPolicy="no-referrer"
              />
            </Figure>
            Profile Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col style={{float: "left"}} xs={2} md={5}>  
                <Form.Label>Name :</Form.Label>
              </Col>
              <Col style={{float: "left"}} xs={2} md={7}>  
                <Form.Label>Email address :</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col style={{float: "left"}} xs={2} md={5}>  
                <Form.Control
                  value={profile[0]['name']}
                  type="name"
                  placeholder="Muhammad Bin Zaifuruh"
                  disabled={true}
                />
              </Col>
              <Col style={{float: "left"}} xs={2} md={7}> 
                <Form.Control
                  value={profile[0]['email']}
                  type="email"
                  placeholder="name@example.com"
                  disabled={true}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <div style={{backgroundColor: "silver", height: "300px", marginTop: "15px", borderRadius: "4px"}}>Reports Here</div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {/* <button onClick={logout}>Facebook Logout</button> */}
          <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
        </Modal.Footer>
      </Modal>
    </>
    )
  } else {
    return (
      <>
        <Modal {...prop} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Using Grid in Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row style={{marginBottom: "15px"}}>
                <Col className="login_btn_container" xs={12} md={12}> 
                  <FacebookLogin
                    cssClass="facebook_login_btn"
                    appId={fbId}
                    // autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook" 
                  />
                </Col>
              </Row>

              <Row>
                <Col className="login_btn_container" xs={12} md={12}>
                  <GoogleLogin
                    clientId={clientId}
                    clientSecret={clientSecret}
                    // redirectUri={YOUR_REDIRECT_URI}
                    // buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    isSignedIn={true}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default Login;