import { compose } from "ramda";
import { connect } from "react-redux";

import {
  toggleTodo,
  updateTodoText,
  updateTodoPriority,
  updateTodoDate
} from "../action/todoActions";
import { getVisibilityFilter, getTodos } from "../selector/todoSelectors";
import { getVisibleTodos, sortTodosByPriority } from "../util/todoUtils";

import TodoListDumb from "./TodoListDumb";

const mapStateToProps = (state: Object): Object => {
  const visibilityFilter = getVisibilityFilter(state);
  const visibleTodos = getVisibleTodos(getTodos(state), visibilityFilter);

  return {
    //TODO: Sort todos by day, and then priority in each day
    todos: sortTodosByPriority(visibleTodos),
    visibilityFilter
  };
};

const mapDispatchToProps = (dispatch: any): Object => {
  return {
    handleToggleTodo(id: number) {
      dispatch(toggleTodo(id));
    },
    handleUpdateTodoText(id: number, text: string) {
      dispatch(updateTodoText(id, text));
    },
    handleUpdateTodoPriority(id: number, priority: number) {
      dispatch(updateTodoPriority(id, priority));
    },
    handleUpdateTodoDate(id: number, date: Date) {
      dispatch(updateTodoDate(id, date));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TodoListDumb);
