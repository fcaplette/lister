import React from "react";
import DateTime from "react-datetime";

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
    this.onOpenCalendar = this.onOpenCalendar.bind(this);
    this.onCalendarChange = this.onCalendarChange.bind(this);
  }

  render() {
    const { isPriorityMenuOpen, isCalendarShown, currentDate } = this.state;
    // Elements
    const priorityMenuElt = isPriorityMenuOpen && (
      <PriorityList handleClick={this.onSetPriority} />
    );

    const calendarElt = isCalendarShown && (
      <div className={styles.calendar}>
        <DateTime input={false} open={isCalendarShown} timeFormat={false} />
      </div>
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
            <span onClick={this.onOpenCalendar}>CAL</span>
            <PriorityButton
              priorityValue={this.state.currentPriority}
              positionClass={styles.priorityDefault}
              handleClick={this.onPriorityClick}
            />
          </div>
          {calendarElt}
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

  // Calendar

  onOpenCalendar() {
    this.setState({
      isCalendarShown: true
    });

    console.log(this.state.isCalendarShown);
  }

  onCalendarChange(date: Date) {
    this.setState({
      currentDate: date
    });
  }
}
