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
  todo: Object; // id, text, completed, priority, date
  handleTodoChange: (todo: Object) => Object;
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
    todoValue: this.props.todo.text,
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

    this.onCalendarChange = this.onCalendarChange.bind(this);
    this.onEditDate = this.onEditDate.bind(this);
    this.onCloseCalendar = this.onCloseCalendar.bind(this);

    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  render() {
    const { todo, visibilityFilter } = this.props;
    const {
      todoValue,
      isFadingOut,
      isEditingTodo,
      isEditingDate,
      isPriorityMenuOpen
    } = this.state;
    const { id, completed, priority, date } = todo;

    // Classes

    const rootClasses = classNames(styles.root, {
      [styles["root-isVisible"]]: !isFadingOut || visibilityFilter === SHOW_ALL,
      [styles["root-isCompleted"]]: completed
    });

    const checkClasses = classNames(styles.check, {
      [styles["check-isCompleted"]]: completed || isFadingOut
    });

    const dateClasses = classNames(styles.date, {
      [styles["date-isPast"]]: moment().diff(date, "days") > 0,
      [styles["date-isVisible"]]: !isFadingOut
    });

    const emptyDateClasses = classNames(styles.emptyDateText, {
      [styles["emptyDateText-isVisible"]]: !isFadingOut
    });

    // Elements

    const priorityMenuElt = isPriorityMenuOpen && (
      <PriorityList handleClick={this.onUpdatePriority} />
    );

    const todoText = isEditingTodo ? (
      <div className={styles.textEdit} onKeyDown={this.onSave}>
        <TextInput
          value={todoValue}
          maxLength={100}
          handleChange={this.onChangeText}
          handleClose={this.onSave}
          isFocused
        />
      </div>
    ) : (
      <span className={styles.text} onClick={this.onUpdateTodo}>
        {todoValue}
      </span>
    );

    const dateTextElt = date ? (
      <span className={dateClasses} onClick={this.onEditDate}>
        {moment(date).format("LL")}
      </span>
    ) : (
      <span className={emptyDateClasses} onClick={this.onEditDate}>
        Add a date
      </span>
    );

    const dateElt = isEditingDate ? (
      <CalendarDatePicker
        currentDate={moment(date, "YYYY-MM-DD").toDate()}
        handleCalendarChange={this.onCalendarChange}
        handleClose={this.onCloseCalendar}
      />
    ) : (
      dateTextElt
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
    const { todo, handleTodoChange, visibilityFilter } = this.props;

    if (visibilityFilter === SHOW_ALL) {
      handleTodoChange({ ...todo, completed: !todo.completed });
    } else {
      this.setState({
        isFadingOut: true
      });

      setTimeout(() => {
        handleTodoChange({ ...todo, completed: !todo.completed });

        this.setState({
          isFadingOut: false
        });
      }, 400);
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
    const { todo, handleTodoChange } = this.props;
    const { todoValue } = this.state;

    if (
      (e && e.key === "Enter" && todoValue.length !== 0) ||
      (!e && todoValue.length !== 0)
    ) {
      this.setState({
        isEditingTodo: false
      });

      handleTodoChange({ ...todo, text: todoValue });
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
    const { todo, handleTodoChange } = this.props;

    handleTodoChange({ ...todo, priority });

    this.setState({ isPriorityMenuOpen: false });
  }

  // Calendar

  onEditDate() {
    this.setState({
      isEditingDate: true
    });
  }

  onCloseCalendar() {
    this.setState({
      isEditingDate: false
    });
  }

  onCalendarChange(date: Date) {
    const { todo, handleTodoChange } = this.props;

    handleTodoChange({ ...todo, date: date.toISOString() });

    this.setState({ isEditingDate: false });
  }
}
