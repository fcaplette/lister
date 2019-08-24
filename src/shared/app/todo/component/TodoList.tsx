import { compose } from "ramda";
import { connect } from "react-redux";

import {
  toggleTodo,
  updateTodoText,
  updateTodoPriority,
  updateTodoDate,
  resetTodoError
} from "../action/todoActions";
import {
  getVisibilityFilter,
  getTodos,
  getTodoError
} from "../selector/todoSelectors";
import {
  getVisibleTodos,
  sortTodosByDatesAndPriority
} from "../util/todoUtils";
import withMount from "../../base/hoc/withMount";

import TodoListDumb from "./TodoListDumb";
import { fetchUser } from "../../../domain/user/action/userActions";
import { getUserName } from "../../../domain/user/selector/userSelectors";

const mapStateToProps = (state: Object): Object => {
  const visibilityFilter = getVisibilityFilter(state);
  const visibleTodos = getVisibleTodos(getTodos(state), visibilityFilter);

  return {
    error: getTodoError(state),
    todos: sortTodosByDatesAndPriority(visibleTodos),
    visibilityFilter,
    // merge
    username: getUserName(state)
  };
};

const mapDispatchToProps = (dispatch: any): Object => ({ dispatch });

const mergeProps = (stateProps: Object, { dispatch }: Object): Object => {
  const { username } = stateProps;

  return {
    ...stateProps,
    handleMount() {
      dispatch(fetchUser(username));
    },
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
    },
    handleRemoveErrorMessage() {
      dispatch(resetTodoError());
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  ),
  withMount
)(TodoListDumb);
