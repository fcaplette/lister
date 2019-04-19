import classNames from "classnames";
import * as React from "react";

const styles = require("./MajorIcon.css");

interface Props {
  positionClass?: string;
}

export default (props: Props): React.Node => (
  <div className={classNames(styles.root, props.positionClass)}>
    <span className={styles.arrow} />
    <span className={classNames(styles.arrow, styles.arrow1)} />
  </div>
);
