import React from "react";
import PrimaryButton from "../../../ui/button/PrimaryButton";

const styles = require("./TodoAddItem.css");

interface Props {
  handleClick: (todoText: string) => void;
}
interface State {
  todoText: string;
}

export default class TodoAddItemDumb extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      todoText: ""
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <div className={styles.root}>
        <input
          value={this.state.todoText}
          className={styles.addInput}
          type="text"
          placeholder="Add your todo"
          onChange={this.onChange}
        />
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

  onChange(e) {
    this.setState({
      todoText: e.target.value
    });
  }
}
