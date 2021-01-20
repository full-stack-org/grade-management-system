import React from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import serviceUrlData from "../common/ServiceUrls.json";
import logOutUser from "../../redux/invokers/LogOutInvoker";

export default function Header() {
  let loggedIn = false;
  let role = "/";

  //Pulling up the data from Redux
  const loggedUser = useSelector((state) => state.loginReducer.data);
  const profileData = useSelector((state) => state.profileReducer.data);

  //Verify whether customer is logged in or not
  if (
    loggedUser.data !== null &&
    typeof loggedUser.data !== "undefined" &&
    typeof loggedUser.data.authenticatedSuccesssfully !== "undefined"
  ) {
    loggedIn = loggedUser.data.authenticatedSuccesssfully;
  }

  //Verify whether customer is logged in or not
  if (profileData.data !== null && typeof profileData.data !== "undefined") {
    role = "/" + profileData.data.role;
  }

  const dispatch = useDispatch();

  function handleLogOut() {
    let serviceInput = {
      url: serviceUrlData.devURI + serviceUrlData.logOutURI,
      token: loggedUser.data.jwtToken,
      callbackSuccess: processTheData,
      callbackFailure: processFailure,
    };
    dispatch(logOutUser(serviceInput));
  }

  function processTheData(response) {
    console.log("Success in processTheData ", response);
  }

  function processFailure(error) {
    console.log("Success in processFailure ", error);
  }

  return (
    <div>
      <Container fluid>
        {!loggedIn ? (
          <Row className="justify-content-center header-common">
            <Col>
              <p>Grade Management System</p>
            </Col>
          </Row>
        ) : (
          <Navbar bg="secondary" variant="dark">
            <Navbar.Brand href={role}>Grade Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Button
                  href="/editprofile"
                  variant="primary"
                  className="mr-sm-2"
                >
                  Edit Profile
                </Button>
                <Button
                  href="/logout"
                  variant="danger"
                  className="text-white"
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )}
      </Container>
    </div>
  );
}
