import classNames from "classnames";
import * as React from "react";
import SecondaryButton from "../../../ui/button/SecondaryButton";
import { SHOW_ALL } from "../constant/todoConstants";

const styles = require("./TodoItem.css");

interface Props {
  id: number;
  text: string;
  isCompleted: boolean;
  handleToggleTodo: (id: number) => void;
  handleUpdateTodo: (text: string) => void;
  visibilityFilter: string;
}

interface State {
  isEditingTodo: boolean;
  isFadingOut: boolean;
}

export default class TodoItem extends React.Component<Props> {
  state = {
    todoValue: this.props.text,
    isEditingTodo: false,
    isFadingOut: false
  };

  constructor(props: Props) {
    super(props);

    this.onToggleTodo = this.onToggleTodo.bind(this);
    this.onUpdateTodo = this.onUpdateTodo.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  render() {
    const { text, isCompleted, visibilityFilter } = this.props;
    const { todoValue, isFadingOut, isEditingTodo } = this.state;

    // Classes

    const rootClasses = classNames(styles.root, {
      [styles["root-isVisible"]]: !isFadingOut || visibilityFilter === SHOW_ALL
    });

    const checkClasses = classNames(styles.check, {
      [styles["check-isCompleted"]]: isCompleted || isFadingOut
    });

    // Elements
    const todoText = isEditingTodo ? (
      <React.Fragment>
        <input type="text" value={todoValue} onChange={this.onChangeText} />{" "}
        <span className={styles.save} onClick={this.onSave}>
          Save
        </span>
      </React.Fragment>
    ) : (
      <span onClick={this.onUpdateTodo}>{todoValue}</span>
    );

    return (
      <li className={rootClasses}>
        <button className={checkClasses} onClick={this.onToggleTodo} />
        {todoText}
      </li>
    );
  }

  onToggleTodo() {
    const { id, handleToggleTodo, visibilityFilter } = this.props;

    if (visibilityFilter === SHOW_ALL) {
      handleToggleTodo(id);
    } else {
      this.setState({
        isFadingOut: true
      });

      setTimeout(() => {
        handleToggleTodo(id);

        this.setState({
          isFadingOut: false
        });
      }, 500);
    }
  }

  onUpdateTodo() {
    this.setState({
      isEditingTodo: true
    });
  }

  onChangeText(e) {
    this.setState({
      todoValue: e.target.value
    });
  }

  onSave() {
    const { id, handleUpdateTodo } = this.props;
    const { todoValue } = this.state;

    this.setState({
      isEditingTodo: false
    });

    handleUpdateTodo(id, { text: todoValue });
  }
}
