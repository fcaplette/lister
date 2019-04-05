/* @flow */
import * as React from "react";

import NavItem from "./NavItem";
import NavCollapsed from "./NavCollapsed";
import CloseButton from "../../ui/button/CloseButton";

const styles = require("./Nav.css");

interface Props {}

interface State {
  isCollapsed: boolean;
}

export default class Nav extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isCollapsed: true
    };

    const self: any = this;
    self.onClick = this.onClick.bind(this);
  }

  render() {
    // const {} = this.props;
    const { isCollapsed } = this.state;

    // Elements

    if (isCollapsed) {
      return <NavCollapsed handleClick={this.onClick} />;
    } else {
      return (
        <div className={styles.root}>
          <div className={styles.overlay} />
          <div className={styles.nav}>
            <CloseButton
              positionClass={styles.closeBtn}
              handleClick={this.onClick}
            />
            <NavItem href="/">Home</NavItem>
            <NavItem href="/about">About</NavItem>
          </div>
        </div>
      );
    }
  }

  onClick() {
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }
}
