import {
  getNotificationIsError,
  getNotificationMessage
} from "../../notification/selector/notificationSelector";

import NotificationDumb from "./NotificationDumb";
import { compose } from "ramda";
import { connect } from "react-redux";
import { dismissNotification } from "../../login/action/loginActions";

const mapStateToProps = (state: Object, props: Object): Object => {
  const { message } = props;

  return {
    message: getNotificationMessage(state),
    isError: getNotificationIsError(state)
  };
};

const mapDispatchToProps = (dispatch: any): Object => ({
  handleDismissNotification() {
    dispatch(dismissNotification());
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NotificationDumb);
