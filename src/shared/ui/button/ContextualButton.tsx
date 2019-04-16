import classNames from "classnames";
import * as React from "react";

const styles = require("./ContextualButton.css");

interface Props {
  children: string;
  positionClass?: string;
  handleClick: () => void;
}

export default (props: Props) => {
  return (
    <span
      className={classNames(styles.root, props.positionClass)}
      onClick={props.handleClick}
    >
      {props.children}
    </span>
  );
};
