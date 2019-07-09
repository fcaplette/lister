import { combineReducers } from "redux";

import todoReducers from "../../todo/reducer/todoReducers";
import visibilityReducers from "../../todo/reducer/visibilityReducers";
import signupReducers from "../../signup/reducer/signupReducers";
import loginReducers from "../../login/reducer/loginReducers";

export default combineReducers({
  todos: todoReducers,
  visibility: visibilityReducers,
  login: loginReducers,
  signup: signupReducers
});
