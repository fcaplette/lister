export const getVisibilityFilter = (state: Object): string => {
  return state.app.visibility;
};

export const getTodos = (state: Object): Array<Object> => {
  return state.app.todos;
};

export const getTodoError = (state: Object): boolean => {
  return state.app.error;
};
