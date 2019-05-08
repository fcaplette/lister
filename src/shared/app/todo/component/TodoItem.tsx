import classNames from "classnames";
import * as React from "react";
import moment from "moment";

import { SHOW_ALL } from "../constant/todoConstants";
import ContextualButton from "../../../ui/button/ContextualButton";
import TextInput from "../../../ui/input/TextInput";
import PriorityButton from "../../../ui/button/PriorityButton";
import PriorityList from "../../priority/component/PriorityList";
import CalendarDatePicker from "../../calendar/component/CalendarDatePicker";

const styles = require("./TodoItem.css");

interface Props {
  id: number;
  text: string;
  isCompleted: boolean;
  priority: number;
  date: Date;
  handleToggleTodo: (id: number) => void;
  handleUpdateTodoText: (id: number, text: string) => void;
  handleUpdateTodoPriority: (id: number, priorityValue: number) => void;
  visibilityFilter: string;
}

interface State {
  isEditingTodo: boolean;
  isEditingDate: boolean;
  isPriorityMenuOpen: boolean;
  isFadingOut: boolean;
  todoValue: string;
}

export default class TodoItem extends React.Component<Props, State> {
  state = {
    todoValue: this.props.text,
    isEditingTodo: false,
    isEditingDate: false,
    isPriorityMenuOpen: false,
    isFadingOut: false
  };

  constructor(props: Props) {
    super(props);

    this.onToggleTodo = this.onToggleTodo.bind(this);
    this.onUpdateTodo = this.onUpdateTodo.bind(this);
    this.onPriorityClick = this.onPriorityClick.bind(this);
    this.onUpdatePriority = this.onUpdatePriority.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  render() {
    const { id, isCompleted, visibilityFilter, priority, date } = this.props;
    const {
      todoValue,
      isFadingOut,
      isEditingTodo,
      isEditingDate,
      isPriorityMenuOpen
    } = this.state;

    // Classes

    const rootClasses = classNames(styles.root, {
      [styles["root-isVisible"]]: !isFadingOut || visibilityFilter === SHOW_ALL
    });

    const checkClasses = classNames(styles.check, {
      [styles["check-isCompleted"]]: isCompleted || isFadingOut
    });

    // Elements

    const priorityMenuElt = isPriorityMenuOpen && (
      <PriorityList handleClick={this.onUpdatePriority} />
    );

    const todoText = isEditingTodo ? (
      <div className={styles.textEdit} onKeyDown={this.onSave}>
        <TextInput
          value={todoValue}
          handleChange={this.onChangeText}
          isFocused
        />
      </div>
    ) : (
      <span className={styles.text} onClick={this.onUpdateTodo}>
        {todoValue}
      </span>
    );

    const dateElt = isEditingDate ? (
      <CalendarDatePicker
        currentDate={date}
        handleCalendarChange={this.onCalendarChange}
      />
    ) : (
      <span className={styles.text}>{moment(date).format("MM/DD/YYYY")}</span>
    );

    return (
      <li className={rootClasses}>
        <div className={styles.row}>
          <button className={checkClasses} onClick={this.onToggleTodo} />
          {todoText}
          <PriorityButton
            handleClick={this.onPriorityClick}
            positionClass={styles.priority}
            priorityValue={priority}
          />
          {priorityMenuElt}
        </div>
        <div className={styles.row}>{dateElt}</div>
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

  onChangeText(text: string) {
    this.setState({
      todoValue: text
    });
  }

  onSave(e: Event) {
    const { id, handleUpdateTodoText } = this.props;
    const { todoValue } = this.state;

    if (e.key === "Enter" && todoValue.length !== 0) {
      this.setState({
        isEditingTodo: false
      });

      handleUpdateTodoText(id, todoValue);
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

  onUpdatePriority(priority: number) {
    const { id, handleUpdateTodoPriority } = this.props;

    handleUpdateTodoPriority(id, priority);

    this.setState({ isPriorityMenuOpen: false });
  }
}
