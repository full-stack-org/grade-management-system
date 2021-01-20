import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormLabel,
  Button,
  Form,
  FormControl,
  Alert,
} from "react-bootstrap";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import history from "../history/History";
import * as fectAPIData from "../redux/invokers/ServiceInvoker";
import serviceUrlData from "../shared/common/ServiceUrls.json";

export default function Teacher() {
  //Pulling up the data from Redux
  const loggedUser = useSelector((state) => state.loginReducer.data);
  const profileData = useSelector((state) => state.profileReducer.data);

  console.log("Profile Data ", profileData)

  //Rediirecting to logout if not login
  if (
    (loggedUser !== null && (typeof loggedUser.data === 'undefined' ||
      typeof loggedUser.data.authenticatedSuccesssfully === "undefined" ||
    !loggedUser.data.authenticatedSuccesssfully))
  ) {
    history.push("/logout");
    window.location.reload();
  }

  //Seting up the Service Response Data
  const [data, setData] = useState([]);

  //Seting up the selected student Data
  const [selectedStudent, setSelectedStudent] = useState({});

  //Loading the students data
  useEffect(() => {
    let serviceInput = {
      data: {
        belongsTo: profileData.data.belongsTo,
        role: "student",
      },
      url: serviceUrlData.devURI + serviceUrlData.getStudentDetailsByClassURI,
      token: loggedUser.data.jwtToken,
      callbackSuccess: processTheData,
      callbackFailure: processFailure,
    };

    //Invoking API
    fectAPIData.fetchAPIDataPost(serviceInput);
  }, []);

  //Processing the Call Back Success
  function processTheData(response) {
    if (response.statusResponse.statusCode === 200) {
      setData(response.studentDetailsBeansList);
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

  //Logic to fetch the selected student from List
  const handleChange = (event) => {
    const emailId = event.target.value;
    if (emailId !== null && emailId !== "") {
      setSelectedStudent(
        data.find((item) => {
          if (item.emailId === emailId) {
            return item;
          }
        })
      );
    }
  };

  //Seting up the validation schema
  const validationSchema = Yup.object({
    studentdata: Yup.string().required("Please select Student"),
    studentName: Yup.string().required("Student Name Missing"),
    telugu: Yup.number()
      .typeError("Telugu Marks must be number")
      .required("Please enter Telugu Marks")
      .min(0)
      .max(100),
    english: Yup.number()
      .typeError("English Marks must be number")
      .required("Please enter English Marks")
      .min(0)
      .max(100),
    hindi: Yup.number()
      .typeError("Hindi Marks must be number")
      .required("Please enter Hindi Marks")
      .min(0)
      .max(100),
  });

  //Validating the From with Yup
  const { register, handleSubmit, errors, clearErrors, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //Setting marks updated status
  const [marksUpdated, setMarksUpdated] = useState(false);

  //Submitting the Marks
  const onSubmit = (values) => {
    let serviceInput = {
      data: {
        studentId: selectedStudent.studentId,
        teluguMarks: values.telugu,
        englishMarks: values.english,
        hindiMarks: values.hindi,
        belongsTo: selectedStudent.belongsTo,
      },
      url: serviceUrlData.devURI + serviceUrlData.updateMarksURI,
      token: loggedUser.data.jwtToken,
      callbackSuccess: processTheMarksData,
      callbackFailure: processFailure,
    };

    fectAPIData.fetchAPIDataPost(serviceInput);
  };

  //Processing the marks response
  function processTheMarksData(response) {
    if (response.statusResponse.statusCode === 200 && response.studentId > 0) {
      setMarksUpdated(true);
    } else {
      history.push("/error");
      window.location.reload();
    }
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-center mt-2 h-50">
          {marksUpdated ? (
            <Alert
              variant="success"
              onClose={() => setMarksUpdated(false)}
              dismissible
            >
              <p className="text-center half-width">
                Marks Updated for{" "}
                <b>
                  {" "}
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </b>{" "}
                Successfully
              </p>
            </Alert>
          ) : (
            ""
          )}
        </Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="justify-content-end">
            <h3 className="mt-1">
              Welcome {profileData.data.firstName} {profileData.data.lastName}{" "}
            </h3>
          </Row>
          <FormGroup controlId="ControlBelongs">
            <Row className="justify-content-center">
              <Col lg={3}>
                <FormLabel>Select Student Name</FormLabel>
                <FormControl
                  as="select"
                  name="studentdata"
                  ref={register}
                  onChange={handleChange}
                  className={errors.studentdata ? " is-invalid" : ""}
                >
                  <option value="">Select Student Name</option>
                  {data.map((student) => (
                    <option key={student.studentId} value={student.emailId}>
                      {student.studentId}
                    </option>
                  ))}
                </FormControl>
                <div className="invalid-feedback">
                  {errors.studentdata?.message}
                </div>
              </Col>
            </Row>
          </FormGroup>

          <Row className="justify-content-center">
            <Col lg={3}>
              <FormGroup controlId="emailId">
                <FormLabel>Name</FormLabel>
                <FormControl
                  type="text"
                  name="studentName"
                  ref={register}
                  defaultValue={selectedStudent.firstName}
                  onBlur={() => clearErrors("studentName")}
                  className={errors.studentName ? " is-invalid" : ""}
                />
                <div className="invalid-feedback">
                  {errors.studentName?.message}
                </div>
              </FormGroup>

              <FormGroup controlId="telugu">
                <FormLabel>Telugu</FormLabel>
                <FormControl
                  type="number"
                  name="telugu"
                  ref={register}
                  className={errors.telugu ? " is-invalid" : ""}
                />
                <div className="invalid-feedback">{errors.telugu?.message}</div>
              </FormGroup>
              <FormGroup controlId="english">
                <FormLabel>English</FormLabel>
                <FormControl
                  type="number"
                  name="english"
                  ref={register}
                  className={errors.english ? " is-invalid" : ""}
                />
                <div className="invalid-feedback">
                  {errors.english?.message}
                </div>
              </FormGroup>
              <FormGroup controlId="hindi">
                <FormLabel>Hindi</FormLabel>
                <FormControl
                  type="number"
                  name="hindi"
                  ref={register}
                  className={errors.hindi ? " is-invalid" : ""}
                />
                <div className="invalid-feedback">{errors.hindi?.message}</div>
              </FormGroup>
              <Button
                variant="danger"
                type="submit"
                className="mb-3 mt-2 mr-4 w-35"
              >
                Submit
              </Button>
              <Button variant="danger" type="reset" className="mb-3 mt-2 w-35">
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
