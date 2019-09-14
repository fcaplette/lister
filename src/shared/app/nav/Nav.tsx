import NavDumb from "./NavDumb";
import { compose } from "ramda";
import { connect } from "react-redux";
import { dismissNotification } from "../login/action/loginActions";
import { withRouter } from "next/router";

interface Props {
  router: any;
}

const mapStateToProps = (state: Object): Object => {
  return {
    ...state
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
    handleLogout() {
      router.push("/login");
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
)(NavDumb);
