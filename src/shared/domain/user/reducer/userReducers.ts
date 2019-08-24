import * as types from "../action/userActionTypes";
import * as loginTypes from "../../../app/login/action/loginActionTypes";

const user = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        id: action.userID
      };

    case loginTypes.LOGIN_SUCCESS:
      return {
        ...state,
        username: action.username
      };

    default:
      return state;
  }
};

export default user;
