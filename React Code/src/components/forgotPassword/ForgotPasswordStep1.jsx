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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import history from "../history/History";
import * as fectAPIData from "../redux/invokers/ServiceInvoker";
import serviceUrlData from "../shared/common/ServiceUrls.json";

export default function ForgotPasswordStep1() {
  //Preparing the validation schema
  const validationSchema = Yup.object({
    emailId: Yup.string()
      .email("Invalid Email Id")
      .required("Email Address is Required"),
  });

  //Preparing the invoker
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

    //Submitting the Form
  const onSubmit = (values) => {
    let serviceInput = {
      data: values,
      url: serviceUrlData.devURI + serviceUrlData.findByEmailIdURI,
      callbackSuccess: processTheData,
      callbackFailure: processFailure,
    };

    fectAPIData.fetchAPIDataPostWithOutJWTToken(serviceInput);
  };

  //Setting up the email existance
  const [emailIdExists, setEmailIdExists] = useState(null);

  //Processing the success response
  function processTheData(response) {
    if (response.statusResponse.statusCode === 200) {
      sessionStorage.setItem('emailId',response.emailId)
      history.push("/forgotstep2");
      window.location.reload();
    } else {
      setEmailIdExists("Email Id does not exists");
    }
  }

  //Processing the failure
  function processFailure(error) {
    if (error.message !== null) {
      setEmailIdExists("Experiencing Service issues");
    }
  }

  return (
    <div>
      <Container fluid>
        <Row className="justify-content-center mt-1 comon-background">
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title className="common-heading">
                Verify youe Email
              </Card.Title>
              {emailIdExists !== null ? (
                <p className="error-meessage"> {emailIdExists}.</p>
              ) : (
                " "
              )}
              <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup controlId="formBasicEmail">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl
                    type="email"
                    name="emailId"
                    placeholder="Enter your email"
                    ref={register}
                    className={errors.emailId ? " is-invalid" : ""}
                  />
                  <div className="invalid-feedback">
                    {errors.emailId?.message}
                  </div>
                </FormGroup>
                <Button
                  variant="danger"
                  type="submit"
                  block
                  className="mb-2 mt-5"
                >
                  Next
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}
