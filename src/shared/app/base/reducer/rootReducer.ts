import { combineReducers } from "redux";
import appReducers from "./appReducers";
import domainReducers from "../../../domain/reducer/domainReducers";

export default combineReducers({
  app: appReducers,
  domain: domainReducers
});
