import * as types from "../action/todoActionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return {
        result: action.id
      };
    default:
      return state;
  }
};
