import { DateTime, Duration } from "luxon";

import * as consts from "../constant/todoConstants";

export const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case consts.SHOW_ALL:
      return todos;

    case consts.SHOW_ACTIVE:
      return todos.filter(todo => !todo.isCompleted);

    case consts.SHOW_COMPLETED:
      return todos.filter(todo => todo.isCompleted);
  }
};

export const sortTodosByDatesAndPriority = (todos: Array<Object>) => {
  if (todos.length) {
    const sortedTodos = todos.sort((todo, todo2) => {
      if (todo.date && todo2.date) {
        const dateRound1 = DateTime.fromJSDate(todo.date).startOf("day");
        const dateRound2 = DateTime.fromJSDate(todo2.date).startOf("day");

        const differenceInDays = dateRound1.diff(dateRound2).as("days");

        if (differenceInDays === 0) {
          return todo.priority - todo2.priority;
        } else {
          return differenceInDays;
        }
      } else if (todo.date) {
        return -1;
      } else {
        return 1;
      }
    });

    return sortedTodos;
  }

  return todos;
};
