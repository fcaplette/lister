import * as React from "react";
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from "../constant/todoConstants";

const styles = require("./VisibilityFilter.css");

interface Props {
  handleChangeVisibility: (visibilityFilter: string) => void;
}

interface State {
  selectedVisibility: string;
}

class VisibilityFilterDumb extends React.Component<Props> {
  state = {
    selectedVisibility: SHOW_ACTIVE
  };

  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <select
        className={styles.root}
        name="visibility_filter"
        onChange={this.onChange}
      >
        <option value={SHOW_ACTIVE}>Show active</option>
        <option value={SHOW_ALL}>Show all</option>
        <option value={SHOW_COMPLETED}>Show completed</option>
      </select>
    );
  }

  onChange(e) {
    this.props.handleChangeVisibility(e.target.value);
  }
}

export default VisibilityFilterDumb;
