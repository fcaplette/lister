import * as types from "./todoActionTypes";

export const addTodo = (text: string) => (dispatch: any) => {
  dispatch({
    type: types.ADD_TODO,
    // TODO: Pass unique id
    id: Math.round(Math.random() * 1000),
    text
  });
};

export const toggleTodo = (id: number) => (dispatch: any) => {
  dispatch({
    type: types.TOGGLE_TODO,
    id
  });
};
