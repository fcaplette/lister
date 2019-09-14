import LoginFormDumb from "./LoginFormDumb";
import { compose } from "ramda";
import { connect } from "react-redux";
import { getLoginError } from "../selector/loginSelectors";
import { getNotificationMessage } from "../../notification/selector/notificationSelector";
import { loginPost } from "../action/loginActions";
import { withRouter } from "next/router";

interface Props {
  router: any;
}

const mapStateToProps = (state: Object): Object => {
  return {
    submitError: getLoginError(state),
    hasNotification: !!getNotificationMessage(state)
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
        .catch(err => {
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
