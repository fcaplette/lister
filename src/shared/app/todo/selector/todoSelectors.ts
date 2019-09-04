export const getVisibilityFilter = (state: Object): string => {
  return state.app.visibility;
};

export const getTodos = (state: Object): Array<Object> => {
  return state.app.todos;
};

export const getTodoByID = (todos: Array<Object>, id: number): Object => {
  let foundTodo;

  todos.forEach(todo => {
    if (todo.id === id) {
      foundTodo = todo;
      return;
    }
  });

  return foundTodo;
};

export const getTodoError = (state: Object): boolean => {
  return state.app.error;
};
