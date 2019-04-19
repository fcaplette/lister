import classNames from "classnames";
import * as React from "react";
import UrgentIcon from "../icon/priority/UrgentIcon";

const styles = require("./PriorityButton.css");

interface Props {
  positionClass?: string;
  handleClick: () => void;
}

export default (props: Props): React.Node => (
  <div
    onClick={props.handleClick}
    className={classNames(styles.root, props.positionClass)}
  >
    <UrgentIcon />
  </div>
);
