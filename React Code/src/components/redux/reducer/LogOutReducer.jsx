import {
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILURE,
} from "../constants/GradeManagementSystemConstants";

const initialData = {
  isLoading: false,
  data: {},
  error: "",
};

export const logOutReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_LOGOUT_REQUEST:
      return {
        isLoading: true,
      };
    case GET_LOGOUT_SUCCESS:
      return initialData;
    case GET_LOGOUT_FAILURE:
      return {
        isLoading: false,
        data: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default logOutReducer;
