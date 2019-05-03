import * as types from "../action/todoActionTypes";

const todosReducer = (state = [], action: Object) => {
  switch (action.type) {
    case types.ADD_TODO:
      return [...state, todoReducer(undefined, action)];
    case types.TOGGLE_TODO:
      return state.map((todo: Object) => todoReducer(todo, action));
    case types.UPDATE_TODO_TEXT:
      return state.map((todo: Object) => todoReducer(todo, action));
    case types.UPDATE_TODO_PRIORITY:
      return state.map((todo: Object) => todoReducer(todo, action));
    default:
      return state;
  }
};

const todoReducer = (state: Object, action: Object) => {
  switch (action.type) {
    case types.ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        priority: action.priority,
        date: action.date,
        isCompleted: false
      };

    case types.TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        isCompleted: !state.isCompleted
      };

    case types.UPDATE_TODO_TEXT:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        text: action.text
      };

    case types.UPDATE_TODO_PRIORITY:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        priority: action.priority
      };
  }
};

export default todosReducer;
