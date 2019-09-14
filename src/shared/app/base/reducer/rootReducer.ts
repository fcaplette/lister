import appReducers from "./appReducers";
import { combineReducers } from "redux";

export default combineReducers({
  app: appReducers
});
