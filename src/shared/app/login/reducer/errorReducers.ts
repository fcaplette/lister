import * as types from "../action/loginActionTypes";

const error = (state: Object = "", action: Object) => {
  switch (action.type) {
    case types.LOGIN_FAILURE:
      return action.exception;

    default:
      return state;
  }
};

export default error;
