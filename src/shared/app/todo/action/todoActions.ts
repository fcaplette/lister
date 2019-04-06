import * as types from "./todoActionTypes";

export const addTodo = () => (dispatch: any) => {
  dispatch({
    type: types.ADD_TODO,
    id: 1
  });
};
