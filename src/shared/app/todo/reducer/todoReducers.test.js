import todoReducers from "./todoReducers";
import * as types from "../action/todoActionTypes";

const prevEmptyState = [];
const stateWithTodo = [
  {
    id: 0,
    text: "Plant a tree",
    completed: false
  }
];
const actionAddTodo = {
  type: types.ADD_TODO,
  id: 0,
  text: "Plant a tree"
};

const actionToggleTodo = {
  type: types.TOGGLE_TODO,
  id: 1
};

it("add new todo in the empty state", () => {
  expect(todoReducers(prevEmptyState, actionAddTodo)).toEqual(stateWithTodo);
});

it("returns a copy of the state", () => {
  expect(todoReducers(prevEmptyState, actionAddTodo)).not.toBe(stateWithTodo);
});

it("toggle the completed value of a todo", () => {
  const stateWithTodos = [
    {
      id: 0,
      text: "Plant a tree",
      completed: false
    },
    {
      id: 1,
      text: "Make an app",
      completed: false
    }
  ];

  const stateWithTodosAfter = [
    {
      id: 0,
      text: "Plant a tree",
      completed: false
    },
    {
      id: 1,
      text: "Make an app",
      completed: true
    }
  ];

  expect(todoReducers(stateWithTodos, actionToggleTodo)).toEqual(
    stateWithTodosAfter
  );
});
