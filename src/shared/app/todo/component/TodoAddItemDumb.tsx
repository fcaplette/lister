import React from "react";
import PrimaryButton from "../../../ui/button/PrimaryButton";
import PriorityButton from "../../../ui/button/PriorityButton";
import UrgentIcon from "../../../ui/icon/priority/UrgentIcon";
import MajorIcon from "../../../ui/icon/priority/MajorIcon";
import MediumIcon from "../../../ui/icon/priority/MediumIcon";
import LowIcon from "../../../ui/icon/priority/LowIcon";

const styles = require("./TodoAddItem.css");

interface Props {
  handleClick: (todoText: string) => void;
}
interface State {
  todoText: string;
  isPriorityMenuOpen: boolean;
}

export default class TodoAddItemDumb extends React.Component<Props, State> {
  state = {
    todoText: "",
    isPriorityMenuOpen: false
  };

  constructor(props: Props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onOpenPriorityMenu = this.onOpenPriorityMenu.bind(this);
  }

  render() {
    // Elements
    const priorityMenuElt = this.state.isPriorityMenuOpen && (
      <ul className={styles.priorityList}>
        <li className={styles.priorityItem}>
          <UrgentIcon />
          <span className={styles.priorityText}>Urgent</span>
        </li>
        <li className={styles.priorityItem}>
          <MajorIcon />
          <span className={styles.priorityText}>Major</span>
        </li>
        <li className={styles.priorityItem}>
          <MediumIcon />
          <span className={styles.priorityText}>Medium</span>
        </li>
        <li className={styles.priorityItem}>
          <LowIcon />
          <span className={styles.priorityText}>Low</span>
        </li>
      </ul>
    );

    return (
      <div className={styles.root}>
        <div className={styles.addInputSection}>
          <input
            value={this.state.todoText}
            className={styles.addInput}
            type="text"
            placeholder="Add your todo"
            onChange={this.onChange}
          />
          <div className={styles.priority}>
            <PriorityButton handleClick={this.onOpenPriorityMenu} />
            {priorityMenuElt}
          </div>
        </div>
        <PrimaryButton
          handleClick={this.onClick}
          isDisabled={this.state.todoText.length === 0}
        >
          Add
        </PrimaryButton>
      </div>
    );
  }

  onClick() {
    this.props.handleClick(this.state.todoText);
    this.setState({
      todoText: ""
    });
  }

  onOpenPriorityMenu() {
    this.setState({
      isPriorityMenuOpen: true
    });
  }

  onChange(e) {
    this.setState({
      todoText: e.target.value
    });
  }
}
