import { compose } from "ramda";
import { connect } from "react-redux";

import TodoAddItemDumb from "./TodoAddItemDumb";
import { postTodo } from "../action/todoActions";
import { getUserID } from "../../../domain/user/selector/userSelectors";

const mapStateToProps = (state: Object): Object => {
  return {
    userID: getUserID(state)
  };
};

const mapDispatchToProps = (dispatch: any): Object => ({ dispatch });

const mergeProps = (stateProps: Object, { dispatch }: Object): Object => {
  const { userID } = stateProps;

  return {
    ...stateProps,
    handleClick(text: string, priority: number, date: Date | null) {
      let ISODate = "";
      if (date) {
        ISODate = date.toISOString();
      }

      dispatch(postTodo(text, priority, ISODate, userID));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
)(TodoAddItemDumb);
