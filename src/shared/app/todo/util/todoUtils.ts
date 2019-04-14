import * as consts from "../constant/todoConstants";

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case consts.SHOW_ALL:
      return todos;

    case consts.SHOW_ACTIVE:
      return todos.filter(todo => !todo.isCompleted);

    case consts.SHOW_COMPLETED:
      return todos.filter(todo => todo.isCompleted);
  }
};
