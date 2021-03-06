import * as types from "../action/todoActionTypes";
import * as userTypes from "../../../domain/user/action/userActionTypes";

const todosReducer = (state = [], action: Object) => {
  switch (action.type) {
    case userTypes.FETCH_CURRENT_USER_SUCCESS:
      if (action && action.todos) {
        return [...action.todos];
      }
      return [...state];
    case types.POST_TODO_SUCCESS:
      return state.map((todo: Object) => todoReducer(todo, action));
    case types.ADD_TODO_OPTIMISTICALLY:
      return [...state, todoReducer(undefined, action)];
    case types.TOGGLE_TODO:
      return state.map((todo: Object) => todoReducer(todo, action));
    case types.UPDATE_TODO_TEXT:
      return state.map((todo: Object) => todoReducer(todo, action));
    case types.UPDATE_TODO_PRIORITY:
      return state.map((todo: Object) => todoReducer(todo, action));
    case types.UPDATE_TODO_DATE:
      return state.map((todo: Object) => todoReducer(todo, action));
    case types.DELETE_TODO_OPTIMISTICALLY:
      return state.filter((todo: Object) => todo.id !== action.id);
    default:
      return state;
  }
};

const todoReducer = (state: Object, action: Object) => {
  switch (action.type) {
    case types.POST_TODO_SUCCESS:
      if (state.id !== 0) {
        return state;
      }

      return {
        ...state,
        id: action.id
      };

    case types.ADD_TODO_OPTIMISTICALLY:
      return {
        id: action.id,
        text: action.text,
        priority: action.priority,
        date: action.date,
        completed: false
      };

    case types.TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
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

    case types.UPDATE_TODO_DATE:
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        date: action.date
      };
  }
};

export default todosReducer;
