import * as React from "react";

const styles = require("./TodoItem.css");

interface Props {
  todo: Object;
}

export default class TodoItem extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { todo } = this.props;

    return <div className={styles.root}>{todo.text}</div>;
  }
}
