import * as types from "../action/signupActionTypes";

const error = (state: Object = "", action: Object) => {
  switch (action.type) {
    case types.REGISTER_USER_FAILURE:
      return action.exception;

    case types.REGISTER_USER_REQUEST:
      return "";

    default:
      return state;
  }
};

export default error;
