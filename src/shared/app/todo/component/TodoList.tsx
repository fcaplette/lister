import { compose } from "ramda";
import { connect } from "react-redux";

import { resetTodoError, patchTodo } from "../action/todoActions";
import {
  getVisibilityFilter,
  getTodos,
  getTodoError,
  getTodoByID
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

  console.log(sortTodosByDatesAndPriority(visibleTodos));

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
  const { username, todos } = stateProps;

  return {
    ...stateProps,
    handleMount() {
      dispatch(fetchUser(username));
    },
    handleTodoChange(todo: Object) {
      const prevTodo = getTodoByID(todos, todo.id);
      // TEMP: REMOVE HARDCODED USER ID
      dispatch(patchTodo(1, todo, prevTodo));
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
