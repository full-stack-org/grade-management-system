import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
} from "../constants/GradeManagementSystemConstants";

export function fetchProfileRequest() {
  return {
    type: GET_PROFILE_REQUEST,
  };
}

export function fecthProfileData(profileData) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: profileData,
  };
}

export function fetchProfileError(error) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: error,
  };
}
