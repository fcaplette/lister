import visibilityFilter from "./visibilityReducers";
import * as types from "../action/visibilityActionTypes";

const actionChangeVisiblity = {
  type: types.SHOW_COMPLETED
};

it("Changes the visibility filter to SHOW_COMPLETED", () => {
  const state = {
    visibilityFilter: types.SHOW_ALL
  };

  const stateAfter = {
    visibilityFilter: types.SHOW_COMPLETED
  };

  expect(visibilityFilter(state, actionChangeVisiblity)).toEqual(stateAfter);
});
