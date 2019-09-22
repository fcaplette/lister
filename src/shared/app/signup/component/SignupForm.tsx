import SignupFormDumb from "./SignupFormDumb";
import { compose } from "ramda";
import { connect } from "react-redux";
import { getSignupError } from "../selector/signupSelectors";
import { registerUser } from "../action/signupActions";
import { withRouter } from "next/router";
import { loginPost } from "../../login/action/loginActions";
import { getCookie } from "../../base/browser/browserUtils";
import { accessToken } from "../../login/settings/loginSettings";

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
      return dispatch(registerUser(email, password))
        .then(() => {
          return dispatch(loginPost(email, password));
        })
        .then(() => {
          router.push("/");
        })
        .catch(() => {
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
