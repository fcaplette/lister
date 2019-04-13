import { combineReducers } from "redux";
import todoReducers from "../../todo/reducer/todoReducers";
import visibilityReducers from "../../todo/reducer/visibilityReducers";

export default combineReducers({
  todos: todoReducers,
  visibility: visibilityReducers
});
