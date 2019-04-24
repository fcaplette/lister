import { connect } from "react-redux";
import { compose } from "ramda";

import SignupFormDumb from "./SignupFormDumb";
import { signupPost } from "../action/signupActions";

const mapStateToProps = (state: Object): Object => {
  return { ...state };
};

const mapDispatchToProps = (dispatch: any): Object => ({
  handleSubmit(email: string, password: string) {
    dispatch(signupPost(email, password));
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignupFormDumb);
