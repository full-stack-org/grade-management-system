import {
  fetchProfileRequest,
  fecthProfileData,
  fetchProfileError,
} from "../action/ProfileActions";

import axios from "axios";

const profileDataInvoker = (input) => {
  return function (dispatch) {
    const headers = {
      Authorization: "Bearer " + input.token,
      "Content-Type": "application/json",
    };

    dispatch(fetchProfileRequest());
    axios
      .post(input.url, JSON.stringify(input.data), { headers: headers })
      .then((response) => {
        console.log("Final Response is : ", response);
        dispatch(fecthProfileData(response));
        input.callbackSuccess(response.data);
      })
      .catch((error) => {
        dispatch(fetchProfileError(error.message));
        input.callbackFailure(error);
      });
  };
};

export default profileDataInvoker;
