import * as React from "react";

import classNames from "classnames";

const styles = require("./EmptySectionText.css");

interface Props {
  children: string;
  positionClass?: string;
}

export default (props: Props) => {
  return (
    <span className={classNames(styles.root, props.positionClass)}>
      {props.children}
    </span>
  );
};
