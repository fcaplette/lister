import * as types from "../action/todoActionTypes";

const todoErrorReducer = (state = false, action: Object) => {
  switch (action.type) {
    case types.POST_TODO_FAILURE:
      return true;

    case types.RESET_TODO_ERROR:
      return false;

    default:
      return state;
  }
};

export default todoErrorReducer;
