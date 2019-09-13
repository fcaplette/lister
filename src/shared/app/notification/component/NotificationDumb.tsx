import * as React from "react";
import classNames from "classnames";

import PrimaryButton from "../../../ui/button/PrimaryButton";
import DiscreteLink from "../../../ui/link/DiscreteLink";

const styles = require("./Notification.css");

interface Props {
  message: string;
  isError: boolean;
  handleDismissNotification: () => void;
}

interface State {
  isVisible: boolean;
}

class NotificationDumb extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isVisible: false
    };

    this.onHideNotification = this.onHideNotification.bind(this);
  }

  componentDidMount() {
    this.setState({
      isVisible: true
    });

    setTimeout(this.onHideNotification, 5000);
  }

  render() {
    const { message, isError } = this.props;
    const { isVisible } = this.state;

    const rootClasses = classNames(styles.root, {
      [styles["root-isVisible"]]: isVisible,
      [styles["root-isError"]]: isError
    });

    return (
      <div className={rootClasses}>
        <span>{message}</span>
      </div>
    );
  }

  onHideNotification() {
    this.setState({
      isVisible: false
    });

    setTimeout(this.props.handleDismissNotification, 1000);
  }
}

export default NotificationDumb;
