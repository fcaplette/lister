import "react-datepicker/dist/react-datepicker-cssmodules.css";

import * as priorities from "../../priority/settings/prioritySettings";

import CalendarDatePicker from "../../calendar/component/CalendarDatePicker";
import CalendarTakeover from "../../date/component/CalendarTakeover";
import PrimaryButton from "../../../ui/button/PrimaryButton";
import PriorityButton from "../../../ui/button/PriorityButton";
import PriorityList from "../../priority/component/PriorityList";
import React from "react";

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

    this.onSubmit = this.onSubmit.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    // Text
    this.onTextChange = this.onTextChange.bind(this);

    //Priority
    this.onPriorityClick = this.onPriorityClick.bind(this);
    this.onSetPriority = this.onSetPriority.bind(this);

    //Calendar
    this.onCalendarChange = this.onCalendarChange.bind(this);
  }

  render() {
    const {
      isPriorityMenuOpen,
      isCalendarShown,
      currentDate,
      currentPriority,
      todoText
    } = this.state;
    // Elements
    const priorityMenuElt = isPriorityMenuOpen && (
      <PriorityList
        handleClick={this.onSetPriority}
        currentPriority={currentPriority}
      />
    );

    return (
      <div className={styles.root}>
        <div className={styles.addInputSection}>
          <input
            value={this.state.todoText}
            className={styles.addInput}
            type="text"
            placeholder="Describe your task"
            onChange={this.onTextChange}
            onKeyDown={this.onSubmit}
            maxLength={100}
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
        <div className={styles.row}>
          <CalendarDatePicker
            currentDate={currentDate}
            handleCalendarChange={this.onCalendarChange}
          />
          <PrimaryButton
            handleClick={this.onClickSubmit}
            isDisabled={todoText.length === 0}
          >
            Add
          </PrimaryButton>
        </div>
      </div>
    );
  }

  onSubmit(e: KeyboardEvent) {
    const { todoText } = this.state;

    if (e.key === "Enter" && todoText.length !== 0) {
      this.submitTodo();
    }
  }

  onClickSubmit() {
    this.submitTodo();
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

  onTextChange(e) {
    this.setState({
      todoText: e.target.value
    });
  }

  onCalendarChange(date: Date) {
    this.setState({
      currentDate: date
    });
  }

  submitTodo() {
    const { todoText, currentPriority, currentDate } = this.state;

    this.props.handleClick(todoText, currentPriority, currentDate);

    this.setState({
      todoText: "",
      currentPriority: priorities.MEDIUM,
      currentDate: ""
    });
  }
}
