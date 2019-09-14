import SignupFormDumb from "./SignupFormDumb";
import { compose } from "ramda";
import { connect } from "react-redux";
import { getSignupError } from "../selector/signupSelectors";
import { registerUser } from "../action/signupActions";
import { withRouter } from "next/router";

interface Props {
  router: any;
}

const mapStateToProps = (state: Object): Object => {
  return {
    submitError: getSignupError(state)
  };
};

const mapDispatchToProps = (dispatch: any): Object => ({ dispatch });

const mergeProps = (
  stateProps: Object,
  { dispatch }: Object,
  { router }: Props
): Object => {
  return {
    ...stateProps,
    handleSubmit(email: string, password: string) {
      dispatch(registerUser(email, password))
        .then(() => {
          router.push("/login");
        })
        .catch(() => {
          router.push("/signup");
          // Do nothing
        });
    }
  };
};
export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
)(SignupFormDumb);
