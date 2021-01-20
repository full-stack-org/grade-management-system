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

export default function ForgotPasswordStep2() {
  const validationSchema = Yup.object({
    pass: Yup.string().required("Password is Required"),
    confirmpass: Yup.string()
      .required("Confirm Password Required")
      .oneOf([Yup.ref("pass"), null], "Passwords must match"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Submitting the Form data
   const onSubmit = (values) => {
    
    let serviceInput = {
      data: {
        emailId: sessionStorage.getItem('emailId'),
        password : values.confirmpass
      },
      url: serviceUrlData.devURI + serviceUrlData.forgotPasswordURI,
      callbackSuccess: processTheData,
      callbackFailure: processFailure,
    };

    //posting the data
    fectAPIData.fetchAPIDataPostWithOutJWTToken(serviceInput);
  
  };

   //Processing the Call Back Success
  function processTheData(response){
    if (response.statusResponse.statusCode === 200) {
      sessionStorage.clear()
      history.push("/forgotsuccess");
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
      <Container fluid>
        <Row className="justify-content-center mt-1 comon-background">
          <Card style={{ width: "25rem" }}>
            <Card.Body>
              <Card.Title className="common-heading">Password Reset</Card.Title>
              <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup controlId="formBasicPassword">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    type="password"
                    name="pass"
                    placeholder="Password"
                    ref={register}
                    className={errors.pass ? " is-invalid" : ""}
                  />
                  <div className="invalid-feedback">{errors.pass?.message}</div>
                </FormGroup>
                <FormGroup controlId="formBasicConfirmPassword">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl
                    type="password"
                    name="confirmpass"
                    placeholder="Confirm Password"
                    ref={register}
                    className={errors.confirmpass ? " is-invalid" : ""}
                  />
                  <div className="invalid-feedback">
                    {errors.confirmpass?.message}
                  </div>
                </FormGroup>
                <Button
                  variant="danger"
                  type="submit"
                  block
                  className="mb-2 mt-5"
                >
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}
