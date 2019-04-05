import React from "react";
import PrimaryButton from "../../ui/button/PrimaryButton";

const styles = require("./TodoAddItem.css");

interface Props {}

export default (props: Props) => {
  return (
    <div className={styles.root}>
      <input
        className={styles.addInput}
        type="text"
        placeholder="Add your todo"
      />
      <PrimaryButton handleClick={() => null}>Add</PrimaryButton>{" "}
    </div>
  );
};
