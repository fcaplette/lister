import * as types from "../action/userActionTypes";
import * as loginTypes from "../../../app/login/action/loginActionTypes";

const user = (state: Object = { id: 0 }, action: Object) => {
  switch (action.type) {
    case types.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        id: action.userID
      };

    default:
      return state;
  }
};

export default user;
