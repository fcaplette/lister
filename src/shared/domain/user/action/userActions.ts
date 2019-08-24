import * as types from "./userActionTypes";
import { userEndpoint } from "../../api/endpoints";

export const fetchUser = (
  username: string = "frederic+1@e-180.com"
): Array<Object> => {
  return dispatch => {
    dispatch(fetchUserRequest());
    return fetch(userEndpoint(username), {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(fetchUserSuccess(json.user_id, json.todos));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchUserFailure(err));
      });
  };
};

export const fetchUserRequest = () => {
  return {
    type: types.FETCH_USER_REQUEST
  };
};

export const fetchUserSuccess = (userID: number, todos: Array<Object>) => {
  return {
    type: types.FETCH_USER_SUCCESS,
    userID,
    todos
  };
};

export const fetchUserFailure = (err: string) => {
  return {
    type: types.FETCH_USER_FAILURE,
    err
  };
};
