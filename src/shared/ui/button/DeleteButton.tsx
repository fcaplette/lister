import classNames from "classnames";
import React from "react";

const styles = require("./DeleteButton.css");

interface Props {
  positionClass: string;
  handleClick: () => void;
}

export default ({ positionClass, handleClick }: Props) => (
  <div className={classNames(styles.root, positionClass)} onClick={handleClick}>
    X
  </div>
);
