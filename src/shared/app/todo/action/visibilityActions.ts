import * as types from "./visibilityActionTypes";

export const setVisibilityFilter = (filter: string) => {
  return {
    type: types.SET_VISIBILITY_FILTER,
    filter
  };
};
