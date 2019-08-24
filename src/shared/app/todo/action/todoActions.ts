import * as types from "./todoActionTypes";
import { addTodoEndpoint } from "../../../domain/api/endpoints";

export const postTodo = (
  text: string,
  priority: number,
  date: string, //ISO
  userID: number
) => {
  return dispatch => {
    dispatch(addTodoOptimistically(text, priority, date));
    dispatch(postTodoRequest());

    return fetch(addTodoEndpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      // TEMP: REMOVE HARCODED ID
      body: JSON.stringify({
        todo: { text, priority, date },
        user_id: userID || 1
      })
    })
      .then(response => response.json())
      .then(json => {
        dispatch(postTodoSuccess());
      })
      .catch(exception => {
        dispatch(postTodoFailure(exception));
      });
  };
};

export const postTodoRequest = () => {
  return {
    type: types.POST_TODO_REQUEST
  };
};

export const postTodoSuccess = () => {
  return {
    type: types.POST_TODO_SUCCESS
  };
};

export const postTodoFailure = exception => {
  return {
    type: types.POST_TODO_FAILURE,
    exception
  };
};

export const resetTodoError = () => {
  return {
    type: types.RESET_TODO_ERROR
  };
};

export const addTodoOptimistically = (
  text: string,
  priority: number,
  date: Date
) => {
  return {
    type: types.ADD_TODO_OPTIMISTICALLY,
    // TODO: Pass unique id
    id: Math.round(Math.random() * Math.random * 1000),
    text,
    priority,
    date
  };
};

export const toggleTodo = (id: number) => {
  return {
    type: types.TOGGLE_TODO,
    id
  };
};

export const updateTodoText = (id: number, text: string) => {
  return {
    type: types.UPDATE_TODO_TEXT,
    id,
    text
  };
};

export const updateTodoPriority = (id: number, priority: number) => {
  return {
    type: types.UPDATE_TODO_PRIORITY,
    id,
    priority
  };
};

export const updateTodoDate = (id: number, date: Date) => {
  return {
    type: types.UPDATE_TODO_DATE,
    id,
    date
  };
};
