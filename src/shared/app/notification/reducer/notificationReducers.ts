import * as types from "../../login/action/loginActionTypes";

const notification = (
  state: Object = { isError: false, message: "" },
  action: Object
) => {
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      return {
        ...state,
        isError: action.isError,
        message: action.message
      };

    case types.HIDE_SESSION_EXPIRED_MESSAGE:
      return {
        ...state,
        isError: false,
        message: ""
      };

    default:
      return state;
  }
};

export default notification;
