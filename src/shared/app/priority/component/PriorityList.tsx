import * as React from "react";
import * as priorities from "../settings/prioritySettings";

import LowIcon from "../../../ui/icon/priority/LowIcon";
import MajorIcon from "../../../ui/icon/priority/MajorIcon";
import MediumIcon from "../../../ui/icon/priority/MediumIcon";
import UrgentIcon from "../../../ui/icon/priority/UrgentIcon";

const styles = require("./PriorityList.css");

interface Props {
  handleClick: (priorityValue: number) => void;
}

export default class PriorityList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onUrgentClick = this.onUrgentClick.bind(this);
    this.onMajorClick = this.onMajorClick.bind(this);
    this.onMediumClick = this.onMediumClick.bind(this);
    this.onLowClick = this.onLowClick.bind(this);
  }

  render() {
    return (
      <ul className={styles.root}>
        <li className={styles.item} onClick={this.onUrgentClick}>
          <UrgentIcon />
          <div className={styles.text}>Urgent</div>
        </li>
        <li className={styles.item} onClick={this.onMajorClick}>
          <MajorIcon />
          <div className={styles.text}>Major</div>
        </li>
        <li className={styles.item} onClick={this.onMediumClick}>
          <MediumIcon />
          <div className={styles.text}>Medium</div>
        </li>
        <li className={styles.item} onClick={this.onLowClick}>
          <LowIcon />
          <div className={styles.text}>Low</div>
        </li>
      </ul>
    );
  }

  onUrgentClick() {
    this.props.handleClick(priorities.URGENT);
  }
  onMajorClick() {
    this.props.handleClick(priorities.MAJOR);
  }
  onMediumClick() {
    this.props.handleClick(priorities.MEDIUM);
  }
  onLowClick() {
    this.props.handleClick(priorities.LOW);
  }
}
