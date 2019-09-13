import { combineReducers } from "redux";

import todoReducers from "../../todo/reducer/todoReducers";
import visibilityReducers from "../../todo/reducer/visibilityReducers";
import signupReducers from "../../signup/reducer/signupReducers";
import loginReducers from "../../login/reducer/loginReducers";
import userReducers from "../../../domain/user/reducer/userReducers";
import todoErrorReducers from "../../todo/reducer/todoErrorReducers";
import notificationReducers from "../../notification/reducer/notificationReducers";

export default combineReducers({
  todos: todoReducers,
  error: todoErrorReducers,
  notification: notificationReducers,
  visibility: visibilityReducers,
  login: loginReducers,
  signup: signupReducers,
  user: userReducers
});
