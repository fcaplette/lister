/* @flow */

import classNames from "classnames";
import * as React from "react";

import styles from "./PrimaryButton.css";

interface Props {
  isDestructive?: boolean;
  children: string;
  handleClick: () => void;
}

export default class PrimaryButton extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    const self: any = this;
    self.onClick = this.onClick.bind(this);
  }

  render() {
    const { isDestructive, children } = this.props;

    // Classes
    const rootClasses = classNames(styles.root, {
      [styles["root-isDestructive"]]: isDestructive
    });

    return (
      <button className={styles.root} onClick={this.onClick}>
        {children}
      </button>
    );
  }

  onClick(e: Event) {
    const { handleClick } = this.props;

    e.preventDefault();

    handleClick();
  }
}
