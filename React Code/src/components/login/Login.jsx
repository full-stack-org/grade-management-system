import React, { useState } from "react";
import {
  Container,
  Row,
  Button,
  Card,
  FormGroup,
  FormLabel,
  Form,
  FormControl,
} from "react-bootstrap";
import * as Yup from "yup";
import history from "../history/History";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import serviceUrlData from "../shared/common/ServiceUrls.json";
import authenticateUser from "../redux/invokers/LoginInvoker";
import profileDataInvoker from "../redux/invokers/ProfileInvoker";

function Login() {
  //Setting up the error messages.
  const validationSchema = Yup.object({
    emailId: Yup.string()
      .email("Invalid Email Id")
      .required("Email Id is Required"),
    password: Yup.string().required("Password is Mandatory"),
    role: Yup.string().required("Please select Role"),
    belongsTo: Yup.string().required("Please select Class"),
  });

  //Validating the From with Yup
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //Setting up the error for authentication failure
  const [errorMessage, setErrorMessage] = useState(null);

  //Dispatch for action dispatch
  const dispatch = useDispatch();

  //Submitting Form Data
  const onSubmit = (values) => {
    let loginRequest = {
      url: serviceUrlData.devURI + serviceUrlData.loginURI,
      data: values,
      callbackSuccess: renderLoggedCustomer,
      callbackFailure: renderTheErrorPage,
    };
    //Invoking the API
    dispatch(authenticateUser(loginRequest));
  };

  //Rendering the authenticated Customer
  function renderLoggedCustomer(response) {
    console.log("Logged Customer Data ", response);
    if (response !== null) {
      if (
        response.statusResponse.statusCode === 200 &&
        response.authenticatedSuccesssfully
      ) {
        let profileRequest = {
          url: serviceUrlData.devURI + serviceUrlData.profileURI,
          data: {
            id: response.id,
          },
          token: response.jwtToken,
          callbackSuccess: renderSuccessPage,
          callbackFailure: renderTheErrorPage,
        };

        //Invoking Profile Invocation
        dispatch(profileDataInvoker(profileRequest));
      } else {
        setErrorMessage("Invalid Credentials");
      }
    }
  }

  //Rendering success page
  function renderSuccessPage(response) {
    if (response !== null && response.statusResponse.statusCode === 200) {
      if (response.role === "student") {
        history.push("/student");
        window.location.reload();
      } else if (response.role === "teacher") {
        history.push("/teacher");
        window.location.reload();
      } else {
        history.push("/");
        window.location.reload();
      }
    }
  }

  //Rendering the error page
  function renderTheErrorPage(error) {
    setErrorMessage("Experencing Service Issues.");
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-2">
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title className="display-3">Login....</Card.Title>
              {errorMessage !== null ? (
                <p className="error-meessage"> {errorMessage}.</p>
              ) : (
                " "
              )}
              <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup controlId="formBasicEmail">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl
                    type="email"
                    placeholder="Enter email"
                    name="emailId"
                    ref={register}
                    className={errors.emailId ? " is-invalid" : ""}
                  />
                  <div className="invalid-feedback">
                    {errors.emailId?.message}
                  </div>
                </FormGroup>
                <FormGroup controlId="formBasicPassword">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={register}
                    className={errors.password ? " is-invalid" : ""}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </FormGroup>
                <FormGroup controlId="exampleForm.ControlSelect1">
                  <FormLabel>Role</FormLabel>
                  <FormControl
                    as="select"
                    name="role"
                    ref={register}
                    className={errors.role ? " is-invalid" : ""}
                  >
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </FormControl>
                  <div className="invalid-feedback">{errors.role?.message}</div>
                </FormGroup>
                <FormGroup controlId="exampleForm.ControlBelongs">
                  <FormLabel>Belongs To</FormLabel>
                  <FormControl
                    as="select"
                    name="belongsTo"
                    ref={register}
                    className={errors.belongsTo ? " is-invalid" : ""}
                  >
                    <option value="">Select Class</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </FormControl>
                  <div className="invalid-feedback">
                    {errors.belongsTo?.message}
                  </div>
                </FormGroup>
                <Button
                  variant="danger"
                  type="submit"
                  block
                  className="mb-3 mt-2"
                >
                  Login
                </Button>
                <Card.Link href="/forgot" className="mr-5">
                  Forgot Password
                </Card.Link>
                <Card.Link href="/register">Register Here</Card.Link>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default withRouter(Login);
