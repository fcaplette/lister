import { compose } from "ramda";
import { connect } from "react-redux";

import { toggleTodo, updateTodo } from "../action/todoActions";
import { getVisibilityFilter, getTodos } from "../selector/todoSelectors";
import { getVisibleTodos, sortTodosByPriority } from "../util/todoUtils";

import TodoListDumb from "./TodoListDumb";

const mapStateToProps = (state: Object): Object => {
  const visibilityFilter = getVisibilityFilter(state);
  const visibleTodos = getVisibleTodos(getTodos(state), visibilityFilter);

  return {
    todos: sortTodosByPriority(visibleTodos),
    visibilityFilter
  };
};

const mapDispatchToProps = (dispatch: any): Object => {
  return {
    handleToggleTodo(id: number) {
      dispatch(toggleTodo(id));
    },
    handleUpdateTodo(id: number, params: Object) {
      dispatch(updateTodo(id, params));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TodoListDumb);
