import { deleteTodo, patchTodo, resetTodoError } from "../action/todoActions";
import {
  getTodoByID,
  getTodoError,
  getTodos,
  getVisibilityFilter
} from "../selector/todoSelectors";
import {
  getVisibleTodos,
  sortTodosByDatesAndPriority
} from "../util/todoUtils";

import Router from "next/router";
import TodoListDumb from "./TodoListDumb";
import { compose } from "ramda";
import { connect } from "react-redux";
import { fetchCurrentUser } from "../../../domain/user/action/userActions";
import { getNotificationMessage } from "../../notification/selector/notificationSelector";
import { getUserID } from "../../../domain/user/selector/userSelectors";
import withMount from "../../base/hoc/withMount";

const mapStateToProps = (state: Object): Object => {
  const visibilityFilter = getVisibilityFilter(state);
  const visibleTodos = getVisibleTodos(getTodos(state), visibilityFilter);

  return {
    userID: getUserID(state),
    error: getTodoError(state),
    todos: sortTodosByDatesAndPriority(visibleTodos),
    hasSessionExpired:
      getNotificationMessage(state) ===
      "Your session has expired. Please login again.",
    visibilityFilter
    // merge
  };
};

const mapDispatchToProps = (dispatch: any): Object => ({ dispatch });

const mergeProps = (stateProps: Object, { dispatch }: Object): Object => {
  const { todos, userID } = stateProps;

  return {
    ...stateProps,
    handleMount() {
      dispatch(fetchCurrentUser());
    },
    handleTodoChange(todo: Object) {
      const prevTodo = getTodoByID(todos, todo.id);
      dispatch(patchTodo(userID, todo, prevTodo));
    },
    handleDeleteTodo(id: number) {
      dispatch(deleteTodo(id));
    },
    handleRemoveErrorMessage() {
      dispatch(resetTodoError());
    },
    handleSessionExpires() {
      Router.push("/login");
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
