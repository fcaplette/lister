import { connect } from "react-redux";
import { compose } from "ramda";
import { withRouter } from "next/router";

import LoginFormDumb from "./LoginFormDumb";
import { loginPost } from "../action/loginActions";
import { getLoginError } from "../selector/loginSelectors";

interface Props {
  router: any;
}

const mapStateToProps = (state: Object): Object => {
  return {
    submitError: getLoginError(state)
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
      dispatch(loginPost(email, password))
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
)(LoginFormDumb);
