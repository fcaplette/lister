import classNames from "classnames";
import * as React from "react";

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
