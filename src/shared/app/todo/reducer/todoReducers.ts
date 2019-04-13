import * as types from "../action/todoActionTypes";

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return [...state, todoReducer(undefined, action)];
    case types.TOGGLE_TODO:
      return state.map((todo: Object) => todoReducer(todo, action));
    default:
      return state;
  }
};

const todoReducer = (state: Object, action: Object) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        isCompleted: false
      };

    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        isCompleted: !state.isCompleted
      };

    default:
      return state;
  }
};

export default todosReducer;
