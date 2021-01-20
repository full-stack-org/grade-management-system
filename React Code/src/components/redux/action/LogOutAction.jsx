import {
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILURE,
} from "../constants/GradeManagementSystemConstants";

export function fetchLogOutRequest() {
  return {
    type: GET_LOGOUT_REQUEST,
  };
}

export function fecthLogOutUserData(userData) {
  return {
    type: GET_LOGOUT_SUCCESS,
    payload: userData,
  };
}

export function fetchUserError(error) {
  return {
    type: GET_LOGOUT_FAILURE,
    payload: error,
  };
}
