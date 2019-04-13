import { compose } from "ramda";
import { connect } from "react-redux";

import TodoAddItemDumb from "./TodoAddItemDumb";
import { addTodo } from "../action/todoActions";

const mapStateToProps = (state: Object): Object => {
  return { ...state };
};

const mapDispatchToProps = (dispatch: any): Object => {
  return {
    handleClick(todo: string) {
      dispatch(addTodo(todo));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TodoAddItemDumb);
