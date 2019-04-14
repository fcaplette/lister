import { compose } from "ramda";
import { connect } from "react-redux";

import { toggleTodo } from "../action/todoActions";
import { getVisibilityFilter, getTodos } from "../selector/todoSelectors";
import { getVisibleTodos } from "../util/todoUtils";

import TodoListDumb from "./TodoListDumb";

const mapStateToProps = (state: Object): Object => {
  const visibilityFilter = getVisibilityFilter(state);
  return {
    todos: getVisibleTodos(getTodos(state), visibilityFilter),
    visibilityFilter
  };
};

const mapDispatchToProps = (dispatch: any): Object => {
  return {
    handleToggleTodo(id: number) {
      dispatch(toggleTodo(id));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TodoListDumb);
