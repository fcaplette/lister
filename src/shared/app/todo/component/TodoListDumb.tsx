import * as React from "react";

import EmptySectionText from "../../../ui/text/EmptySectionText";
import TodoAddItem from "./TodoAddItem";
import TodoItem from "./TodoItem";
import VisibilityFilter from "./VisibilityFilter";

const styles = require("./TodoList.css");

interface Props {
  error: boolean;
  todos: Array<Object>;
  hasSessionExpired: boolean;
  handleTodoChange: (todo: Object) => void;
  handleRemoveErrorMessage: () => void;
  handleSessionExpires: () => void;
  visibilityFilter: string;
}

export default class TodoList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    const {
      error,
      hasSessionExpired,
      handleRemoveErrorMessage,
      handleSessionExpires
    } = this.props;

    if (!prevProps.error && error) {
      this.errorTimeout = setTimeout(handleRemoveErrorMessage, 3000);
    }

    if (hasSessionExpired && !prevProps.hasSessionExpired) {
      handleSessionExpires();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.errorTimeout);
  }

  render() {
    const { error, todos, handleTodoChange, visibilityFilter } = this.props;

    const activeTodos: Array<Object> = [];
    const completedTodos: Array<Object> = [];

    let activeTodosElt;
    let completedTodosElt;
    let todosElt;
    let errorElt;

    // Components

    if (error) {
      errorElt = (
        <p className={styles.errorBanner}>
          There was an error updating your todos. Your last changes will not be
          saved
        </p>
      );
    }

    if (visibilityFilter === "SHOW_ALL" && todos.length) {
      todos.forEach(todo => {
        if (todo.completed) {
          completedTodos.push(todo);
        } else {
          activeTodos.push(todo);
        }
      });

      activeTodosElt = activeTodos.map((todo: Object) => (
        <React.Fragment key={todo.id}>
          <TodoItem todo={{ ...todo }} {...this.props} />
        </React.Fragment>
      ));

      completedTodosElt = completedTodos.map((todo: Object) => (
        <React.Fragment key={todo.id}>
          <TodoItem todo={{ ...todo }} {...this.props} />
        </React.Fragment>
      ));
    } else {
      todosElt = todos.length ? (
        todos.map((todo: Object) => (
          <React.Fragment key={todo.id}>
            <TodoItem todo={{ ...todo }} {...this.props} />
          </React.Fragment>
        ))
      ) : (
        <EmptySectionText children={"You are done!"} />
      );
    }

    const activeSection = activeTodos.length ? (
      <div className={styles.section}>
        <h3>Active</h3>
        <ul className={styles.list}>{activeTodosElt}</ul>
      </div>
    ) : null;

    const completedSection = completedTodos.length ? (
      <div className={styles.section}>
        <h3>Completed</h3>
        <ul className={styles.list}>{completedTodosElt}</ul>
      </div>
    ) : null;

    const todoSection =
      visibilityFilter === "SHOW_ALL" ? (
        <div>
          {activeSection}
          {completedSection}
        </div>
      ) : (
        <ul className={styles.list}>{todosElt}</ul>
      );

    return (
      <div className={styles.root}>
        <VisibilityFilter />
        {errorElt}
        {todoSection}
      </div>
    );
  }
}
