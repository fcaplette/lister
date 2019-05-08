import * as React from "react";
import DatePicker from "react-datepicker";

const styles = require("./CalendarDatePicker.css");

interface Props {
  currentDate: Date;
  handleCalendarChange: (date: Date) => void;
}

export default class CalendarDatePicker extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  render() {
    const { currentDate, handleCalendarChange } = this.props;

    const datePlaceholderElt = !currentDate && (
      <span className={styles.datePlaceholder}>Pick a date</span>
    );

    return (
      <div className={styles.root}>
        {datePlaceholderElt}
        <DatePicker selected={currentDate} onChange={this.onChange} />
      </div>
    );
  }

  onChange(date: Date) {
    this.props.handleCalendarChange(date);
  }
}
