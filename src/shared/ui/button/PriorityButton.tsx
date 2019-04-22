import classNames from "classnames";
import * as React from "react";
import UrgentIcon from "../icon/priority/UrgentIcon";
import MajorIcon from "../icon/priority/MajorIcon";
import MediumIcon from "../icon/priority/MediumIcon";
import LowIcon from "../icon/priority/LowIcon";

const styles = require("./PriorityButton.css");

interface Props {
  priorityValue: number;
  positionClass?: string;
  handleClick: () => void;
}

export default (props: Props): React.Node => {
  let IconElt;

  switch (props.priorityValue) {
    case 0:
      IconElt = <UrgentIcon />;
      break;

    case 1:
      IconElt = <MajorIcon />;
      break;

    case 2:
      IconElt = <MediumIcon />;
      break;

    case 3:
      IconElt = <LowIcon />;
      break;
  }
  return (
    <div
      onClick={props.handleClick}
      className={classNames(styles.root, props.positionClass)}
    >
      {IconElt}
    </div>
  );
};
