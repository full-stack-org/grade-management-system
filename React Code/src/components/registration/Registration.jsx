import React,{useState} from "react";
import {
  Container,
  Row,
  Button,
  Card,
  FormGroup,
  FormLabel,
  FormCheck,
  FormControl,
  Form,
} from "react-bootstrap";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import history from "../history/History";
import * as fectAPIData from "../redux/invokers/ServiceInvoker";
import serviceUrlData from "../shared/common/ServiceUrls.json";

export default function Registration() {
  //Preparing the validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Id")
      .required("Email Address is Required"),
    fname: Yup.string().required("First Name is Required"),
    lname: Yup.string().required("Last Name is Required"),
    pass: Yup.string().required("Password is Required"),
    confirmpass: Yup.string()
      .required("Confirm Password Required")
      .oneOf([Yup.ref("pass"), null], "Passwords must match"),
    gender: Yup.string().required("Please select Gender"),
    role: Yup.string().required("Please select Role"),
    belongs: Yup.string().required("Please select class"),
  });

  //setting up the resolver
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [registrationData,setRegistrationData] = useState({})

  //Submitting the service data
  const onSubmit = (values) => {   
    setRegistrationData(values)  
    let serviceInput = {
      data: {
        emailId: values.email
      },
      url: serviceUrlData.devURI + serviceUrlData.findByEmailIdURI,
      callbackSuccess: processTheData,
      callbackFailure: processFailure,
    };

    //posting the data
    fectAPIData.fetchAPIDataPostWithOutJWTToken(serviceInput);
  };

  //Setting up customr existance
  const [customerExists, setCustomerExists] = useState(false);

  //Processing the Call Back Success
  function processTheData(response) {
    if (response.statusResponse.statusCode === 422) {
      let serviceInput = {
        data: {
          emailId: registrationData.email,
          firstName: registrationData.fname,
          lastName: registrationData.lname,
          password: registrationData.confirmpass,
          gender: registrationData.gender,
          role: registrationData.role,
          belongsTo: registrationData.belongs,
        },
        url: serviceUrlData.devURI + serviceUrlData.registrationURI,
        callbackSuccess: processTheSuccessPage,
        callbackFailure: processFailure,
      };
  
      //posting the data
      fectAPIData.fetchAPIDataPostWithOutJWTToken(serviceInput);

    } else {
      setCustomerExists(true);
    }
  }

   //Processing the Call Back Success
  function processTheSuccessPage(response){
    if (response.statusResponse.statusCode === 200) {    
      history.push("/registersuccess");
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
              <Card.Title className="display-4">Registration</Card.Title>
              {customerExists ? <p className="error-meessage">User Already Exists</p> : ""}
              <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup controlId="registerEmail">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    ref={register}
                    className={errors.email ? " is-invalid" : ""}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </FormGroup>
                <FormGroup controlId="registerFirstName">
                  <FormLabel>First Name</FormLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter First Name"
                    name="fname"
                    ref={register}
                    className={errors.fname ? " is-invalid" : ""}
                  />
                  <div className="invalid-feedback">
                    {errors.fname?.message}
                  </div>
                </FormGroup>
                <FormGroup controlId="registerLastName">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter Last Name"
                    name="lname"
                    ref={register}
                    className={errors.lname ? " is-invalid" : ""}
                  />
                  <div className="invalid-feedback">
                    {errors.lname?.message}
                  </div>
                </FormGroup>
                <FormGroup controlId="registerPassword">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    name="pass"
                    ref={register}
                    className={errors.pass ? " is-invalid" : ""}
                  />
                  <div className="invalid-feedback">{errors.pass?.message}</div>
                </FormGroup>
                <FormGroup controlId="registerConfirmPassword">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmpass"
                    ref={register}
                    className={errors.confirmpass ? " is-invalid" : ""}
                  />
                  <div className="invalid-feedback">
                    {errors.confirmpass?.message}
                  </div>
                </FormGroup>
                <FormLabel>Gender</FormLabel>
                <FormGroup>
                  <FormCheck
                    type="radio"
                    label="Male"
                    value="Male"
                    inline
                    name="gender"
                    ref={register}
                    className={errors.gender ? " is-invalid" : ""}
                  ></FormCheck>
                  <FormCheck
                    type="radio"
                    label="Female"
                    value="Female"
                    inline
                    name="gender"
                    ref={register}
                    className={errors.gender ? " is-invalid" : ""}
                  ></FormCheck>
                  <div className="invalid-feedback">
                    {errors.gender?.message}
                  </div>
                </FormGroup>
                <FormGroup controlId="registrationFieldSelect1">
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
                    name="belongs"
                    ref={register}
                    className={errors.belongs ? " is-invalid" : ""}
                  >
                    <option value="">Select Class</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </FormControl>
                  <div className="invalid-feedback">
                    {errors.belongs?.message}
                  </div>
                </FormGroup>
                <Button
                  variant="danger"
                  type="submit"
                  className="mb-2 mt-2 mr-4 w-30"
                >
                  Register
                </Button>
                <Button variant="danger" type="reset" className="w-30">
                  Reset
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}
