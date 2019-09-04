import { getVisibleTodos, sortTodosByDatesAndPriority } from "./todoUtils";
import * as consts from "../constant/todoConstants";

describe("getVisibleTodos", () => {
  const todosList = [
    { text: "TodoTextCompleted", completed: true },
    { text: "TodoTextCompleted2", completed: true },
    { text: "TodoText", completed: false }
  ];
  const todosListCompleted = [
    { text: "TodoTextCompleted", completed: true },
    { text: "TodoTextCompleted2", completed: true }
  ];
  const todosListActive = [{ text: "TodoText", completed: false }];

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
    {
      text: "TodoDate1",
      priority: 0,
      date: new Date(2019, 11, 27).toISOString()
    },
    {
      text: "TodoDate2",
      priority: 1,
      date: new Date(2019, 11, 24).toISOString()
    },
    {
      text: "TodoDate3",
      priority: 0,
      date: new Date(2019, 11, 23).toISOString()
    },
    {
      text: "TodoDate4",
      priority: 0,
      date: new Date(2019, 11, 24).toISOString()
    }
  ];

  const todoListSorted = [
    {
      text: "TodoDate3",
      priority: 0,
      date: new Date(2019, 11, 23).toISOString()
    },
    {
      text: "TodoDate4",
      priority: 0,
      date: new Date(2019, 11, 24).toISOString()
    },
    {
      text: "TodoDate2",
      priority: 1,
      date: new Date(2019, 11, 24).toISOString()
    },
    {
      text: "TodoDate1",
      priority: 0,
      date: new Date(2019, 11, 27).toISOString()
    }
  ];

  it("sorts the todo items by date and by priority if the date is equal", () => {
    expect(sortTodosByDatesAndPriority(todosList)).toEqual(todoListSorted);
  });

  it("returns an empty array if no dates are specified", () => {
    expect(sortTodosByDatesAndPriority([])).toEqual([]);
  });
});
