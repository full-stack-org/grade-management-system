import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
  } from "../constants/GradeManagementSystemConstants";

  const initialData = {
    isLoading: false,
    data: {},
    error: "",
  };
  
  export const profileReducer = (state = initialData, action) => {
    switch (action.type) {
      case GET_PROFILE_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case GET_PROFILE_SUCCESS:
        return {
          isLoading: false,
          data: action.payload,
          error: "",
        };
      case GET_PROFILE_FAILURE:
        return {
          isLoading: false,
          data: {},
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default profileReducer;