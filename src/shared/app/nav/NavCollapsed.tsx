import classNames from "classnames";
import * as React from "react";

const styles = require("./NavCollapsed.css");

interface Props {
  handleClick: () => void;
}

interface State {
  isHovered: boolean;
}

class NavCollapsed extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.state = {
      isHovered: false
    };
  }

  render() {
    const { handleClick } = this.props;
    const { isHovered } = this.state;

    const lineClasses = classNames(styles.line, {
      [styles["line-isHovered"]]: isHovered
    });

    return (
      <div
        className={styles.root}
        onClick={handleClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className={lineClasses} />
        <div className={lineClasses} />
        <div className={lineClasses} />
      </div>
    );
  }

  onMouseEnter() {
    this.setState({
      isHovered: true
    });
  }

  onMouseLeave() {
    this.setState({
      isHovered: false
    });
  }
}

export default NavCollapsed;
