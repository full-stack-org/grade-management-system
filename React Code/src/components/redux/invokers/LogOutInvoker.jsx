import {
  fetchLogOutRequest,
  fecthLogOutUserData,
  fetchUserError,
} from "../action/LogOutAction";

import { persistor,store } from "../store/Store";

import axios from "axios";

const logOutUser = (input) => {
  return function(dispatch) {
    const headers = {
      Authorization: "Bearer " + input.token,
      "Content-Type": "application/json",
    };
    dispatch(fetchLogOutRequest());
    axios
      .get(input.url, { headers: headers })
      .then((response) => {
        persistor.purge()
        store.dispatch({type:'RESET'})
        dispatch(fecthLogOutUserData(response));
        input.callbackSuccess(response.data);
      })
      .catch((error) => {
        dispatch(fetchUserError(error.message));
        input.callbackFailure(error);
      });
  };
};

export default logOutUser;
