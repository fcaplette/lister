import { connect } from "react-redux";
import { compose } from "ramda";

import NotificationDumb from "./NotificationDumb";
import {
  getNotificationMessage,
  getNotificationIsError
} from "../../notification/selector/notificationSelector";
import { dismissSessionExpiredNotification } from "../../login/action/loginActions";

const mapStateToProps = (state: Object, props: Object): Object => {
  const { message } = props;

  return {
    message: getNotificationMessage(state),
    isError: getNotificationIsError(state)
  };
};

const mapDispatchToProps = (dispatch: any): Object => ({
  handleDismissNotification() {
    dispatch(dismissSessionExpiredNotification());
  }
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NotificationDumb);
