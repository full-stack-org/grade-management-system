import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import history from "../history/History";
import * as fectAPIData from "../redux/invokers/ServiceInvoker";
import serviceUrlData from "../shared/common/ServiceUrls.json";

export default function Student() {
  const [data, setData] = useState({});

  //Pulling up the data from Redux
  const loggedUser = useSelector((state) => state.loginReducer.data);
  const profileData = useSelector((state) => state.profileReducer.data);

  //Rediirecting to logout if not login
  if (
    typeof loggedUser.data === "undefined" ||
    typeof loggedUser.data.authenticatedSuccesssfully === "undefined" ||
    !loggedUser.data.authenticatedSuccesssfully
  ) {
    history.push("/logout");
    window.location.reload();
  }

  useEffect(() => {
    let serviceInput = {
      data: {
        studentId: profileData.data.id,
        belongsTo: profileData.data.belongsTo,
      },
      url: serviceUrlData.devURI + serviceUrlData.getMarksByIdURI,
      token: loggedUser.data.jwtToken,
      callbackSuccess: processSuccess,
      callbackFailure: processFailure,
    };

    //Invoking API
    fectAPIData.fetchAPIDataPost(serviceInput);
  }, []);

  function processSuccess(response) {
    if (response.statusResponse.statusCode === 200) {
      setData(response);
    } else {
      history.push("/error");
      window.location.reload();
    }
  }

  //Processing the Call Back Failure
  function processFailure(error) {
    if (error !== null && error.message !== null) {
      history.push("/error");
      window.location.reload();
    }
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-end">
          <h3 className="mt-2">
            Welcome {profileData.data.firstName} {profileData.data.lastName}
          </h3>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col>
            <h3 className="text-center text-capitalize">
              Current Sem score card
            </h3>
            <Table striped hover bordered variant="dark">
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Name</td>
                  <td>Telugu</td>
                  <td>English</td>
                  <td>Hindi</td>
                  <td>Grade</td>
                </tr>
              </thead>
              <tbody>
                {data !== null ? (
                  <tr>
                    <td>{data.studentId}</td>
                    <td>
                      {profileData.data.firstName} {profileData.data.lastName}
                    </td>
                    <td>
                      {data.teluguMarks > 35 ? data.teluguMarks : "Failed"}
                    </td>
                    <td>
                      {data.englishMarks > 35 ? data.englishMarks : "Failed"}
                    </td>
                    <td>{data.hindiMarks > 35 ? data.hindiMarks : "Failed"}</td>
                    <td>{data.grade}</td>
                  </tr>
                ) : (
                  "No Data Found"
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
