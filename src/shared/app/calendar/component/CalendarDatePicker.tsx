import * as React from "react";

import CloseButton from "../../../ui/button/CloseButton";
import DatePicker from "react-datepicker";

const styles = require("./CalendarDatePicker.css");

interface Props {
  currentDate: Date;
  handleCalendarChange: (date: Date) => void;
  handleClose?: () => void;
}

export default class CalendarDatePicker extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.dateRef = React.createRef();
  }

  componentDidMount() {
    this.props.handleClose && this.dateRef.current.input.focus();
  }

  render() {
    const { currentDate, handleCalendarChange, handleClose } = this.props;

    const closeBtn = handleClose && (
      <CloseButton handleClick={handleClose} positionClass={styles.closeBtn} />
    );

    return (
      <div className={styles.root}>
        <DatePicker
          selected={currentDate}
          placeholderText="Pick a date (optional)"
          onChange={this.onChange}
          ref={this.dateRef}
        />
        {closeBtn}
      </div>
    );
  }

  onChange(date: Date) {
    this.props.handleCalendarChange(date);
  }
}
