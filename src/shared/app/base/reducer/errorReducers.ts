import * as types from "../../signup/action/signupActionTypes";

const error = (state: Object = "", action: Object) => {
  switch (action.type) {
    case types.REGISTER_USER_FAILURE:
      return action.exception;

    default:
      return state;
  }
};

export default error;
