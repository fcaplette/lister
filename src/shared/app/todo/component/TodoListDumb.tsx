import * as React from "react";

import TodoItem from "./TodoItem";
import TodoAddItem from "./TodoAddItem";
import EmptySectionText from "../../../ui/text/EmptySectionText";

const styles = require("./TodoList.css");

interface Props {
  todos: Array<Object>;
  handleToggleTodo: (id: number) => void;
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

    const activeTodos: Array<Object> = [];
    const completedTodos: Array<Object> = [];

    let activeTodosElt;
    let completedTodosElt;
    let todosElt;

    if (visibilityFilter === "SHOW_ALL" && todos.length) {
      todos.forEach(todo => {
        if (todo.isCompleted) {
          completedTodos.push(todo);
        } else {
          activeTodos.push(todo);
        }
      });

      activeTodosElt = activeTodos.map((todo: Object) => (
        <React.Fragment key={todo.id}>
          <TodoItem
            {...todo}
            handleToggleTodo={handleToggleTodo}
            handleUpdateTodoText={handleUpdateTodoText}
            handleUpdateTodoPriority={handleUpdateTodoPriority}
            visibilityFilter={visibilityFilter}
          />
        </React.Fragment>
      ));

      completedTodosElt = completedTodos.map((todo: Object) => (
        <React.Fragment key={todo.id}>
          <TodoItem
            {...todo}
            handleToggleTodo={handleToggleTodo}
            handleUpdateTodoText={handleUpdateTodoText}
            handleUpdateTodoPriority={handleUpdateTodoPriority}
            visibilityFilter={visibilityFilter}
          />
        </React.Fragment>
      ));
    } else {
      todosElt = todos.length ? (
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
        <TodoAddItem />
        {todoSection}
      </div>
    );
  }
}
