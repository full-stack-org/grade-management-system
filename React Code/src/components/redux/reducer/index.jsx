import { combineReducers } from "redux";
import LoginReducer from "../reducer/LoginReducer";
import LogOutReducer from "../reducer/LogOutReducer";
import ProfileReducer  from "../reducer/ProfileReducer";

const allReducers = combineReducers({
  loginReducer: LoginReducer,
  logOutReducer: LogOutReducer,
  profileReducer: ProfileReducer
});

// reset the state of a redux store
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
    // for all keys defined in your persistConfig(s)
    localStorage.removeItem('persist:root')
  }
  return allReducers(state, action)
}

export default rootReducer;

//export default allReducers;
