/* @flow */
import classNames from "classnames";
import * as React from "react";

interface Props {
  children: string;
  positionClass: string;
}

export default ({ positionClass, children }: Props) => (
  <div className={classNames(styles.root, positionClass)}>{children}</div>
);
