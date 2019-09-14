import * as React from "react";

/* @flow */
import classNames from "classnames";

const styles = require("./PageTitle.css");

interface Props {
  children: string;
  positionClass?: string;
}

export default ({ positionClass, children }: Props) => (
  <div className={classNames(styles["pagetitle-root"], positionClass)}>
    {children}
  </div>
);
