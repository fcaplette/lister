import * as types from "./todoActionTypes";

export const addTodo = (text: string, priority: number, date: Date) => {
  return {
    type: types.ADD_TODO,
    // TODO: Pass unique id
    id: Math.round(Math.random() * 1000),
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
