/* @flow */
import classNames from "classnames";
import * as React from "react";

import CloseButton from "../../ui/button/CloseButton";
import NavCollapsed from "./NavCollapsed";
import NavItem from "./NavItem";
import { accessToken } from "../login/settings/loginSettings";
import { deleteCookie } from "../base/browser/browserUtils";

const styles = require("./Nav.css");

interface Props {
  handleLogout: () => void;
}

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
    self.onCloseBtnClick = this.onCloseBtnClick.bind(this);
    self.onLogout = this.onLogout.bind(this);
  }

  render() {
    const { isCollapsed } = this.state;

    const navClasses = classNames(styles.nav, {
      [styles["nav-isVisible"]]: !isCollapsed
    });

    const overlayClasses = classNames(styles.overlay, {
      [styles["overlay-isVisible"]]: !isCollapsed
    });

    // Elements

    let colapsedNavElt;

    if (isCollapsed) {
      colapsedNavElt = <NavCollapsed handleClick={this.onCloseBtnClick} />;
    }
    return (
      <div className={styles.root}>
        {colapsedNavElt}
        <div className={navClasses}>
          <div className={overlayClasses} />
          <div className={styles.navBar}>
            <CloseButton
              positionClass={styles.closeBtn}
              handleClick={this.onCloseBtnClick}
            />
            <NavItem href="/">Home</NavItem>
            <NavItem handleClick={this.onLogout}>Logout</NavItem>
          </div>
        </div>
      </div>
    );
  }

  onCloseBtnClick() {
    window.requestAnimationFrame(() => {
      this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
    });
  }

  onLogout() {
    deleteCookie(accessToken);
    this.props.handleLogout();
  }
}
