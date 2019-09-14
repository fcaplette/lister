import * as React from "react";

import classNames from "classnames";

const styles = require("./MediumIcon.css");

interface Props {
  positionClass?: string;
}

export default (props: Props): React.Node => (
  <span className={classNames(styles.root, props.positionClass)}>=</span>
);
