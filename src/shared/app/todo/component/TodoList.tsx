import { compose } from "ramda";
import { connect } from "react-redux";

import { toggleTodo } from "../action/todoActions";

import TodoListDumb from "./TodoListDumb";

const mapStateToProps = (state: Object): Object => {
  return {
    todos: state.app.todos
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
