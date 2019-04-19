import classNames from "classnames";
import * as React from "react";

const styles = require("./MoreOptions.css");

interface Props {
  positionClass?: string;
  handleClick: () => void;
}

export default (props: Props): React.Node => (
  <span
    className={classNames(styles.root, props.positionClass)}
    onClick={props.handleClick}
  >
    ...
  </span>
);
