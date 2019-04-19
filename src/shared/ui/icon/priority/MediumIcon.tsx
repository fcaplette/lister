import classNames from "classnames";
import * as React from "react";

const styles = require("./MediumIcon.css");

interface Props {
  positionClass?: string;
}

export default (props: Props): React.Node => (
  <span className={classNames(styles.root, props.positionClass)}>=</span>
);
