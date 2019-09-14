import TodoAddItemDumb from "./TodoAddItemDumb";
import { compose } from "ramda";
import { connect } from "react-redux";
import { getUserID } from "../../../domain/user/selector/userSelectors";
import { postTodo } from "../action/todoActions";

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
