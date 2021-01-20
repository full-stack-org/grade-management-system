import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ForgotPasswordStep1 from "../forgotPassword/ForgotPasswordStep1";
import Registration from "../registration/Registration";
import Login from "../login/Login";
import Student from "../student/Student";
import Teacher from "../teacher/Teacher";
import EditProfile from "../profile/EditProfile";
import PasswordUpdateSuccessful from "../forgotPassword/PasswordUpdateSuccessful";
import RegistrationSuccessful from "../registration/RegistrationSuccessful";
import ForgotPasswordStep2 from "../forgotPassword/ForgotPasswordStep2";
import Error from "../shared/common/Error";

export default function Routes() {
  const logged = true;
  const passwordSuccess =
    sessionStorage.getItem("emailId") !== null ? true : false;
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/forgot" exact component={ForgotPasswordStep1} />
        <Route path="/forgotstep2" exact component={ForgotPasswordStep2} />
        <Route
          path="/registersuccess"
          exact
          component={RegistrationSuccessful}
        />
        <Route path="/register" exact component={Registration} />

        <Route path="/error" exact component={Error} />

        {passwordSuccess ? (
          <Route
            path="/forgotsuccess"
            exact
            component={PasswordUpdateSuccessful}
          />
        ) : (
          <Redirect to="/" />
        )}

        {logged ? (
          <Route path="/student" exact component={Student} />
        ) : (
          <Redirect to="/" />
        )}

        {logged ? (
          <Route path="/teacher" exact component={Teacher} />
        ) : (
          <Redirect to="/" />
        )}

        {logged ? (
          <Route path="/editprofile" exact component={EditProfile} />
        ) : (
          <Redirect to="/" />
        )}

        <Route path="/logout" exact component={Login} />
        <Route component={Login} />
      </Switch>
    </div>
  );
}
