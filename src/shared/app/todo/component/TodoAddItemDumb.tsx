import React from "react";
import DatePicker from "react-datepicker";

import PriorityButton from "../../../ui/button/PriorityButton";
import PriorityList from "../../priority/component/PriorityList";
import * as priorities from "../../priority/settings/prioritySettings";
import CalendarTakeover from "../../date/component/CalendarTakeover";

import "react-datepicker/dist/react-datepicker-cssmodules.css";

const styles = require("./TodoAddItem.css");

interface Props {
  handleClick: (todoText: string, priority: number) => void;
}
interface State {
  todoText: string;
  currentPriority: number;
  isPriorityMenuOpen: boolean;
  isCalendarShown: boolean;
  currentDate: Date;
}

export default class TodoAddItemDumb extends React.Component<Props, State> {
  state = {
    todoText: "",
    currentPriority: 2,
    isPriorityMenuOpen: false,
    isCalendarShown: false,
    currentDate: null
  };

  constructor(props: Props) {
    super(props);

    // Text
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    //Priority
    this.onPriorityClick = this.onPriorityClick.bind(this);
    this.onSetPriority = this.onSetPriority.bind(this);

    //Calendar
    this.onCalendarChange = this.onCalendarChange.bind(this);
  }

  render() {
    const { isPriorityMenuOpen, isCalendarShown, currentDate } = this.state;
    // Elements
    const priorityMenuElt = isPriorityMenuOpen && (
      <PriorityList handleClick={this.onSetPriority} />
    );

    const datePlaceholderElt = !currentDate && (
      <span className={styles.datePlaceholder}>Pick a date</span>
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
        <div className={styles.calendar}>
          {datePlaceholderElt}
          <DatePicker
            selected={this.state.currentDate}
            onChange={this.onCalendarChange}
          />
        </div>
      </div>
    );
  }

  onSubmit(e: KeyboardEvent) {
    const { todoText, currentPriority, currentDate } = this.state;

    if (e.key === "Enter" && todoText.length !== 0) {
      this.props.handleClick(todoText, currentPriority, currentDate);
      this.setState({
        todoText: "",
        currentPriority: priorities.MEDIUM,
        currentDate: ""
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

  onCalendarChange(date: Date) {
    this.setState({
      currentDate: date
    });
  }
}
