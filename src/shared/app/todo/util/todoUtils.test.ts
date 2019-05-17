import { getVisibleTodos, sortTodosByDatesAndPriority } from "./todoUtils";
import * as consts from "../constant/todoConstants";

describe("getVisibleTodos", () => {
  const todosList = [
    { text: "TodoTextCompleted", isCompleted: true },
    { text: "TodoTextCompleted2", isCompleted: true },
    { text: "TodoText", isCompleted: false }
  ];
  const todosListCompleted = [
    { text: "TodoTextCompleted", isCompleted: true },
    { text: "TodoTextCompleted2", isCompleted: true }
  ];
  const todosListActive = [{ text: "TodoText", isCompleted: false }];

  it("returns all todo if the filter is SHOW_ALL", () => {
    expect(getVisibleTodos(todosList, consts.SHOW_ALL)).toBe(todosList);
  });

  it("returns only completed todo if the filter is SHOW_COMPLETED", () => {
    expect(getVisibleTodos(todosList, consts.SHOW_COMPLETED)).toEqual(
      todosListCompleted
    );
  });

  it("returns only active todo if the filter is SHOW_ACTIVE", () => {
    expect(getVisibleTodos(todosList, consts.SHOW_ACTIVE)).toEqual(
      todosListActive
    );
  });
});

describe("sortTodosByDatesAndPriority", () => {
  const todosList = [
    { text: "TodoDate1", priority: 0, date: new Date(2019, 11, 27) },
    { text: "TodoDate2", priority: 1, date: new Date(2019, 11, 24) },
    { text: "TodoDate3", priority: 0, date: new Date(2019, 11, 23) },
    { text: "TodoDate4", priority: 0, date: new Date(2019, 11, 24) }
  ];

  const todoListSorted = [
    { text: "TodoDate3", priority: 0, date: new Date(2019, 11, 23) },
    { text: "TodoDate4", priority: 0, date: new Date(2019, 11, 24) },
    { text: "TodoDate2", priority: 1, date: new Date(2019, 11, 24) },
    { text: "TodoDate1", priority: 0, date: new Date(2019, 11, 27) }
  ];

  it("sorts the todo items by date and by priority if the date is equal", () => {
    expect(sortTodosByDatesAndPriority(todosList)).toEqual(todoListSorted);
  });

  it("returns an empty array if no dates are specified", () => {
    expect(sortTodosByDatesAndPriority([])).toEqual([]);
  });
});
