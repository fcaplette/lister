import { combineReducers } from "redux";

import todoReducers from "../../todo/reducer/todoReducers";
import visibilityReducers from "../../todo/reducer/visibilityReducers";
import signupReducers from "../../signup/reducer/signupReducers";
import loginReducers from "../../login/reducer/loginReducers";
import userReducers from "../../../domain/user/reducer/userReducers";
import todoErrorReducer from "../../todo/reducer/todoErrorReducers";

export default combineReducers({
  todos: todoReducers,
  error: todoErrorReducer,
  visibility: visibilityReducers,
  login: loginReducers,
  signup: signupReducers,
  user: userReducers
});
