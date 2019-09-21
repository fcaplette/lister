import { applyMiddleware, createStore } from "redux";

import rootReducer from "../reducer/rootReducer";
import thunk from "redux-thunk";

export function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
