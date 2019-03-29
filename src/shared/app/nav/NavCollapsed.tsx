import * as React from "react";

const styles = require("./NavCollapsed.css");

interface Props {
  handleClick: () => void;
}

export default (props: Props) => (
  <div className={styles.root} onClick={props.handleClick}>
    <div className={styles.line} />
    <div className={styles.line} />
    <div className={styles.line} />
  </div>
);
