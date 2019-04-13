import * as types from "../action/visibilityActionTypes";

const visibilityFilter = (state: Object = types.SHOW_ALL, action: Object) => {
  switch (action.type) {
    case types.SET_VISIBILITY_FILTER:
      return action.filter;

    default:
      return state;
  }
};

export default visibilityFilter;
