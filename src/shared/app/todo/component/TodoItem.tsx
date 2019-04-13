import classNames from "classnames";
import * as React from "react";

const styles = require("./TodoItem.css");

interface Props {
  id: number;
  text: string;
  isCompleted: boolean;
  handleToggleTodo: (id: number) => void;
}

export default class TodoItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  render() {
    const { text, isCompleted } = this.props;

    // Classes

    const rootClasses = classNames(styles.root, {
      [styles["root-isCompleted"]]: isCompleted
    });

    return (
      <div className={rootClasses} onClick={this.onClick}>
        {text}
      </div>
    );
  }

  onClick() {
    const { id, handleToggleTodo } = this.props;

    handleToggleTodo(id);
  }
}
