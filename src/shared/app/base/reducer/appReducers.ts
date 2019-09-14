import { combineReducers } from "redux";
import loginReducers from "../../login/reducer/loginReducers";
import notificationReducers from "../../notification/reducer/notificationReducers";
import signupReducers from "../../signup/reducer/signupReducers";
import todoErrorReducers from "../../todo/reducer/todoErrorReducers";
import todoReducers from "../../todo/reducer/todoReducers";
import userReducers from "../../../domain/user/reducer/userReducers";
import visibilityReducers from "../../todo/reducer/visibilityReducers";

export default combineReducers({
  todos: todoReducers,
  error: todoErrorReducers,
  notification: notificationReducers,
  visibility: visibilityReducers,
  login: loginReducers,
  signup: signupReducers,
  user: userReducers
});
