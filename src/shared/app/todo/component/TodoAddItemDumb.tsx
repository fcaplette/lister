import React from "react";
import PrimaryButton from "../../../ui/button/PrimaryButton";
import PriorityButton from "../../../ui/button/PriorityButton";
import PriorityList from "../../priority/component/PriorityList";

const styles = require("./TodoAddItem.css");

interface Props {
  handleClick: (todoText: string) => void;
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

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onPriorityClick = this.onPriorityClick.bind(this);
    this.setPriority = this.setPriority.bind(this);
  }

  render() {
    // Elements
    const priorityMenuElt = this.state.isPriorityMenuOpen && (
      <PriorityList handleClick={this.setPriority} />
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
            <PriorityButton
              priorityValue={this.state.currentPriority}
              positionClass={styles.priorityDefault}
              handleClick={this.onPriorityClick}
            />
          </div>
          {priorityMenuElt}
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
    this.props.handleClick(this.state.todoText, this.state.currentPriority);
    this.setState({
      todoText: ""
    });
  }

  onPriorityClick() {
    this.setState(prevState => {
      return {
        ...prevState,
        isPriorityMenuOpen: !prevState.isPriorityMenuOpen
      };
    });
  }

  setPriority(priorityValue: number) {
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
