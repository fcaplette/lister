import * as React from "react";

import TodoItem from "./TodoItem";
import TodoAddItem from "./TodoAddItem";
import EmptySectionText from "../../../ui/text/EmptySectionText";

const styles = require("./TodoList.css");

interface Props {
  todos: Array<Object>;
  handleUpdateTodoText: (id: number, text: string) => void;
  handleUpdateTodoPriority: (id: number, priority: number) => void;
  visibilityFilter: string;
}

export default class TodoList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      todos,
      handleToggleTodo,
      handleUpdateTodoText,
      handleUpdateTodoPriority,
      visibilityFilter
    } = this.props;

    const todosElt = todos.length ? (
      todos.map((todo: Object) => (
        <React.Fragment key={todo.id}>
          <TodoItem
            {...todo}
            handleToggleTodo={handleToggleTodo}
            handleUpdateTodoText={handleUpdateTodoText}
            handleUpdateTodoPriority={handleUpdateTodoPriority}
            visibilityFilter={visibilityFilter}
          />
        </React.Fragment>
      ))
    ) : (
      <EmptySectionText children={"No TODOS"} />
    );

    return (
      <div className={styles.root}>
        <TodoAddItem />
        <ul className={styles.list}>{todosElt}</ul>
      </div>
    );
  }
}
