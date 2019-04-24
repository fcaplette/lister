import { connect } from "react-redux";
import { compose } from "ramda";

import LoginFormDumb from "./LoginFormDumb";
import { loginPost } from "../action/loginActions";

const mapStateToProps = (state: Object): Object => {
  return { ...state };
};

const mapDispatchToProps = (dispatch: any): Object => ({
  handleSubmit(email: string, password: string) {
    dispatch(loginPost(email, password));
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginFormDumb);
