import * as React from "react";

const styles = require("./DiscreteLink.css");

interface Props {
  href: string;
  children: string;
}

export default (props: Props): React.Node => (
  <a className={styles.root} href={props.href}>
    {props.children}
  </a>
);
