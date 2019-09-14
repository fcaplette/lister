import * as types from "../action/todoActionTypes";

import todoReducers from "./todoReducers";

const prevEmptyState = [];
const stateWithTodo = [
  {
    id: 0,
    text: "Plant a tree",
    completed: false
  }
];
const actionAddTodo = {
  type: types.ADD_TODO_OPTIMISTICALLY,
  id: 0,
  text: "Plant a tree"
};

const actionToggleTodo = {
  type: types.TOGGLE_TODO,
  id: 1
};

const actionUpdateTodoText = {
  type: types.UPDATE_TODO_TEXT,
  id: 0,
  text: "Updated text"
};

const actionUpdateTodoPriority = {
  type: types.UPDATE_TODO_PRIORITY,
  id: 0,
  priority: 0
};

describe("todoReducers", () => {
  it("add new todo in the empty state", () => {
    expect(todoReducers(prevEmptyState, actionAddTodo)).toEqual(stateWithTodo);
  });

  it("returns a copy of the state", () => {
    expect(todoReducers(prevEmptyState, actionAddTodo)).not.toBe(stateWithTodo);
  });

  it("updates the text of a single todo", () => {
    const stateWithTodos = [
      {
        id: 0,
        text: "Plant a tree"
      },
      {
        id: 1,
        text: "Make an app"
      }
    ];

    const stateWithTodosAfter = [
      {
        id: 0,
        text: "Updated text"
      },
      {
        id: 1,
        text: "Make an app"
      }
    ];
    expect(todoReducers(stateWithTodos, actionUpdateTodoText)).toEqual(
      stateWithTodosAfter
    );
  });

  it("updates the priority of a single todo", () => {
    const stateWithTodos = [
      {
        id: 0,
        priority: 2
      },
      {
        id: 1,
        priority: 2
      }
    ];

    const stateWithTodosAfter = [
      {
        id: 0,
        priority: 0
      },
      {
        id: 1,
        priority: 2
      }
    ];
    expect(todoReducers(stateWithTodos, actionUpdateTodoPriority)).toEqual(
      stateWithTodosAfter
    );
  });

  it("toggle the isCompleted value of a todo", () => {
    const stateWithTodos = [
      {
        id: 0,
        completed: false
      },
      {
        id: 1,
        completed: false
      }
    ];

    const stateWithTodosAfter = [
      {
        id: 0,
        completed: false
      },
      {
        id: 1,
        completed: true
      }
    ];

    expect(todoReducers(stateWithTodos, actionToggleTodo)).toEqual(
      stateWithTodosAfter
    );
  });
});
