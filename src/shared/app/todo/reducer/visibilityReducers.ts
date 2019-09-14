import * as types from "../action/visibilityActionTypes";

import { SHOW_ACTIVE, SHOW_ALL } from "../constant/todoConstants";

const visibilityFilter = (state: Object = SHOW_ACTIVE, action: Object) => {
  switch (action.type) {
    case types.SET_VISIBILITY_FILTER:
      return action.filter;

    default:
      return state;
  }
};

export default visibilityFilter;
