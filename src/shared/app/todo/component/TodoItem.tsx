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
  date?: string;
  handleToggleTodo: (id: number) => void;
  handleUpdateTodoText: (id: number, text: string) => void;
  handleUpdateTodoPriority: (id: number, priorityValue: number) => void;
  handleUpdateTodoDate: (id: number, date: Date) => void;
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

    this.onCalendarChange = this.onCalendarChange.bind(this);
    this.onEditDate = this.onEditDate.bind(this);
    this.onCloseCalendar = this.onCloseCalendar.bind(this);

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
      [styles["root-isVisible"]]: !isFadingOut || visibilityFilter === SHOW_ALL,
      [styles["root-isCompleted"]]: isCompleted
    });

    const checkClasses = classNames(styles.check, {
      [styles["check-isCompleted"]]: isCompleted || isFadingOut
    });

    const dateClasses = classNames(styles.date, {
      [styles["date-isPast"]]: moment().diff(date, "days") > 0
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
      <span className={styles.emptyDateText} onClick={this.onEditDate}>
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

    if (
      (e && e.key === "Enter" && todoValue.length !== 0) ||
      (!e && todoValue.length !== 0)
    ) {
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
    const { id, handleUpdateTodoDate } = this.props;

    handleUpdateTodoDate(id, date);

    this.setState({ isEditingDate: false });
  }
}
