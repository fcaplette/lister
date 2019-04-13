import * as React from "react";

import TodoItem from "./TodoItem";
import TodoAddItem from "./TodoAddItem";
import EmptySectionText from "../../../ui/text/EmptySectionText";

const styles = require("./TodoList.css");

interface Props {
  todos: Array<Object>;
  handleToggleTodo: (id: number) => void;
}

export default class TodoList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { todos, handleToggleTodo } = this.props;

    const todosElt = todos.length ? (
      todos.map((todo: Object) => (
        <React.Fragment key={todo.id}>
          <TodoItem {...todo} handleToggleTodo={handleToggleTodo} />
        </React.Fragment>
      ))
    ) : (
      <EmptySectionText children={"No TODOS"} />
    );

    return (
      <ul className={styles.root}>
        <TodoAddItem />
        {todosElt}
      </ul>
    );
  }
}
