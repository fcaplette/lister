import React from "react";
import PriorityButton from "../../../ui/button/PriorityButton";
import PriorityList from "../../priority/component/PriorityList";
import * as priorities from "../../priority/settings/prioritySettings";

const styles = require("./TodoAddItem.css");

interface Props {
  handleClick: (todoText: string, priority: number) => void;
}
interface State {
  todoText: string;
  currentPriority: number;
  isPriorityMenuOpen: boolean;
}

export default class TodoAddItemDumb extends React.Component<Props, State> {
  state = {
    todoText: "",
    currentPriority: 2,
    isPriorityMenuOpen: false
  };

  constructor(props: Props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onPriorityClick = this.onPriorityClick.bind(this);
    this.onSetPriority = this.onSetPriority.bind(this);
  }

  render() {
    // Elements
    const priorityMenuElt = this.state.isPriorityMenuOpen && (
      <PriorityList handleClick={this.onSetPriority} />
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
            onKeyDown={this.onSubmit}
          />
          <div className={styles.priority}>
            <PriorityButton
              priorityValue={this.state.currentPriority}
              positionClass={styles.priorityDefault}
              handleClick={this.onPriorityClick}
            />
          </div>
          {priorityMenuElt}
        </div>
      </div>
    );
  }

  onSubmit(e: KeyboardEvent) {
    if (e.key === "Enter" && this.state.todoText.length !== 0) {
      this.props.handleClick(this.state.todoText, this.state.currentPriority);
      this.setState({
        todoText: "",
        currentPriority: priorities.MEDIUM
      });
    }
  }

  onPriorityClick() {
    this.setState(prevState => {
      return {
        ...prevState,
        isPriorityMenuOpen: !prevState.isPriorityMenuOpen
      };
    });
  }

  onSetPriority(priorityValue: number) {
    this.setState({
      currentPriority: priorityValue,
      isPriorityMenuOpen: false
    });
  }

  onChange(e) {
    this.setState({
      todoText: e.target.value
    });
  }
}
