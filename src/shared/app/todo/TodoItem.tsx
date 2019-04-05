import * as React from "react";
import { observer } from "mobx-react";

const styles = require("./TodoItem.css");

interface Props {
  todo: Object;
}

@observer
export default class TodoItem extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { todo } = this.props;

    return <div className={styles.root}>{todo.text}</div>;
  }
}
