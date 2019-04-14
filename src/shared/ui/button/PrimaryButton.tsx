/* @flow */

import classNames from "classnames";
import * as React from "react";

const styles = require("./PrimaryButton.css");

interface Props {
  isDestructive?: boolean;
  isDisabled?: boolean;
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
    const { isDestructive, isDisabled, children } = this.props;

    // Classes
    const rootClasses = classNames(styles.root, {
      [styles["root-isDestructive"]]: isDestructive,
      [styles["root-isDisabled"]]: isDisabled
    });

    return (
      <button
        className={rootClasses}
        onClick={this.onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    );
  }

  onClick(e: MouseEvent) {
    const { handleClick } = this.props;

    e.preventDefault();

    handleClick();
  }
}
