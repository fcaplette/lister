import * as types from "./todoActionTypes";
import {
  addTodoEndpoint,
  patchTodoEndpoint,
  deleteTodoEndpoint
} from "../../../domain/api/endpoints";
import { getCookie } from "../../base/browser/browserUtils";
import { accessToken } from "../../login/settings/loginSettings";

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
        Authorization: `JWT ${getCookie(accessToken)}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todo: { text, priority, date },
        user_id: userID
      })
    })
      .then(response => response.json())
      .then(json => {
        dispatch(postTodoSuccess(json.id));
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

export const postTodoSuccess = (id: number) => {
  return {
    type: types.POST_TODO_SUCCESS,
    id
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
    id: 0,
    text,
    priority,
    date
  };
};

// PATCH TODOS

export const patchTodo = (userID: number, todo: Object, prevTodo: Object) => {
  const {
    id,
    text,
    priority,
    completed,
    date // ISO
  } = todo;
  const {
    id: prevID,
    text: prevText,
    priority: prevPriority,
    completed: prevCompleted,
    date: prevDate // ISO
  } = prevTodo;
  return dispatch => {
    dispatch(patchTodoRequest());

    // Optimisitic actions
    if (text !== prevText) {
      dispatch(updateTodoText(id, text));
    }
    if (priority !== prevPriority) {
      dispatch(updateTodoPriority(id, priority));
    }
    if (date !== prevDate) {
      dispatch(updateTodoDate(id, date));
    }

    return fetch(patchTodoEndpoint, {
      method: "PATCH",
      mode: "cors",
      headers: {
        Authorization: `JWT ${getCookie(accessToken)}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todo: { id, text, priority, date, completed },
        user_id: userID
      })
    })
      .then(response => response.json())
      .then(json => {
        dispatch(patchTodoSuccess());
        if (completed !== prevCompleted) {
          dispatch(toggleTodo(id));
        }
      })
      .catch(exception => {
        dispatch(patchTodoFailure(exception));
      });
  };
};

export const patchTodoRequest = () => {
  return {
    type: types.PATCH_TODO_REQUEST
  };
};

export const patchTodoSuccess = () => {
  return {
    type: types.PATCH_TODO_SUCCESS
  };
};

export const patchTodoFailure = exception => {
  return {
    type: types.PATCH_TODO_FAILURE,
    exception
  };
};

export const deleteTodo = (id: number) => {
  return dispatch => {
    dispatch(deleteTodoOptimistically(id));
    dispatch(deleteTodoRequest());

    return fetch(deleteTodoEndpoint, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `JWT ${getCookie(accessToken)}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(json => {
        dispatch(deleteTodoSuccess());
      })
      .catch(exception => {
        dispatch(deleteTodoFailure(exception));
        dispatch(showNotification(exception, true));
      });
  };
};

export const deleteTodoOptimistically = (id: number) => {
  return {
    type: types.DELETE_TODO_OPTIMISTICALLY,
    id
  };
};

export const deleteTodoRequest = () => {
  return {
    type: types.DELETE_TODO_REQUEST
  };
};

export const deleteTodoSuccess = () => {
  return {
    type: types.DELETE_TODO_SUCCESS
  };
};

export const deleteTodoFailure = () => {
  return {
    type: types.DELETE_TODO_FAILURE
  };
};

// Optimistic actions

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
