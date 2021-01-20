import React from "react";
import { useSelector } from "react-redux";

export default function Error() {
  let role = "/";

  //Pulling up the data from Redux
  const loggedUser = useSelector((state) => state.profileReducer.data);
  //Verify whether customer is logged in or not
  if (
    loggedUser !== null &&
    loggedUser.data !== null &&
    typeof loggedUser.data !== "undefined" &&
    typeof loggedUser.data.role !== "undefined"
  ) {
    role = "/" + loggedUser.data.role;
  }

  return (
    <div>
      <h2 className="text-center text-danger">
        We are experiencing the system problems. Please try again Later.
        <a href={role}> Click here</a> to go back
      </h2>
    </div>
  );
}
