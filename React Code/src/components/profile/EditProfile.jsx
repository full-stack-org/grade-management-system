import React, { useState} from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  Button,
  Form,
  FormControl,
  FormCheck,
  Alert,
} from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import serviceUrlData from "../shared/common/ServiceUrls.json";
import * as fectAPIData from "../redux/invokers/ServiceInvoker";
import history from "../history/History";
import profileDataInvoker from "../redux/invokers/ProfileInvoker";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function EditProfile() {
  //Preparing validation schema
  const validationSchema = Yup.object({
    emailId: Yup.string()
      .email("Invalid Email Id")
      .required("Email Id is Required"),
    firstName: Yup.string().required("Firt Name is Mandatory"),
    lastName: Yup.string().required("Last Name is Mandatory"),
    gender: Yup.string().required("Gender is Mandatory"),
    role: Yup.string().required("Please select Role"),
    belongsTo: Yup.string().required("Please select Class"),
  });

  //Verify with Yup resolver
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //Pulling up the data from Redux
  const loggedUser = useSelector((state) => state.loginReducer.data);
  const profileData = useSelector((state) => state.profileReducer.data);

  //If customer is logged in then proceed otherwise taking them to ogin Page
  //Rediirecting to logout if not login
  if (
    typeof loggedUser.data === "undefined" ||
    typeof loggedUser.data.authenticatedSuccesssfully === "undefined" ||
    !loggedUser.data.authenticatedSuccesssfully
  ) {
    history.push("/logout");
    window.location.reload();
  }

  //Submitting modified Data
  const submitFormData = (values) => {
    let serviceInput = {
      data: {
        id: profileData.data.id,
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        role: values.role,
        belongsTo: values.belongsTo,
        emailId: values.emailId,
      },
      url: serviceUrlData.devURI + serviceUrlData.updateProfile,
      token: loggedUser.data.jwtToken,
      callbackSuccess: processTheData,
      callbackFailure: processFailure,
    };

    fectAPIData.fetchAPIDataPost(serviceInput);
  };

  //Setting profile updated status
  const [profileUpdated, setProfileUpdated] = useState(false);

  const dispatch = useDispatch()

  //Processing the Call Back Success
  function processTheData(response) {
    if (response.statusResponse.statusCode === 200) {
      let profileRequest = {
        url: serviceUrlData.devURI + serviceUrlData.profileURI,
        data: {
          id: profileData.data.id,
        },
        token: loggedUser.data.jwtToken,
        callbackSuccess: renderSuccessPage,
        callbackFailure: processFailure,
      };
      //Invoking Profile Invocation
      dispatch(profileDataInvoker(profileRequest));
    } else {
      history.push("/error");
      window.location.reload();
    }
  }

  //Getting the profile after updating the Details
  function renderSuccessPage(response) {
    if (response.statusResponse.statusCode === 200) {
      setProfileUpdated(true);
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
        <Row className="justify-content-center mt-2 h-50">
          {profileUpdated ? (
            <Alert
              variant="success"
              onClose={() => setProfileUpdated(false)}
              dismissible
            >
              <p className="text-center half-width">
                Profile Updated Successfully
              </p>
            </Alert>
          ) : (
            ""
          )}
        </Row>
        <Row className="justify-content-center mt-3">
          <Col lg={4}>
            <h4 className="mb-3 text-danger text-uppercase">
              Edit Your Profile
            </h4>
            <Form onSubmit={handleSubmit(submitFormData)}>
              <FormGroup>
                <FormLabel>Email Id</FormLabel>
                <FormControl
                  type="email"
                  name="emailId"
                  ref={register}
                  defaultValue={profileData.data.emailId}
                  className={errors.emailId ? " is-invalid" : ""}
                />
                <div className="invalid-feedback">
                  {errors.emailId?.message}
                </div>
              </FormGroup>
              <FormGroup>
                <FormLabel>First Name</FormLabel>
                <FormControl
                  type="text"
                  name="firstName"
                  ref={register}
                  defaultValue={profileData.data.firstName}
                  className={errors.firstName ? " is-invalid" : ""}
                />
                <div className="invalid-feedback">
                  {errors.firstName?.message}
                </div>
              </FormGroup>
              <FormGroup>
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  type="text"
                  name="lastName"
                  ref={register}
                  defaultValue={profileData.data.lastName}
                  className={errors.lastName ? " is-invalid" : ""}
                />
                <div className="invalid-feedback">
                  {errors.lastName?.message}
                </div>
              </FormGroup>
              <FormGroup>
                <FormLabel>
                  <FormCheck
                    inline
                    value="Male"
                    type="radio"
                    name="gender"
                    className="mr-1"
                    defaultChecked={profileData.data.gender === "Male"}
                    className={errors.gender ? " is-invalid" : ""}
                    ref={register}
                  />
                  Male
                </FormLabel>
                <FormLabel>
                  <FormCheck
                    inline
                    value="Female"
                    type="radio"
                    name="gender"
                    defaultChecked={profileData.data.gender === "Female"}
                    ref={register}
                    className={errors.gender ? " is-invalid" : ""}
                    className="mr-1 ml-2"
                  />
                  Female
                </FormLabel>
                <div className="invalid-feedback">{errors.gender?.message}</div>
              </FormGroup>
              <FormGroup>
                <FormLabel>Role</FormLabel>
                <FormControl
                  as="select"
                  name="role"
                  className={errors.role ? " is-invalid" : ""}
                  ref={register}
                  defaultValue={profileData.data.role}
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
                  className={errors.belongsTo ? " is-invalid" : ""}
                  ref={register}
                  defaultValue={profileData.data.belongsTo}
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
                className="mb-3 mt-2"
                block
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
