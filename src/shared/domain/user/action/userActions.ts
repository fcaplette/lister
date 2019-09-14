import * as types from "./userActionTypes";

import {
  deleteCookie,
  getCookie
} from "../../../app/base/browser/browserUtils";

import { accessToken } from "../../../app/login/settings/loginSettings";
import { showNotification } from "../../../app/login/action/loginActions";
import { tokenError } from "../../../app/todo/settings/todoSettings";
import { userEndpoint } from "../../api/endpoints";

export const fetchCurrentUser = (): Array<Object> => {
  return dispatch => {
    dispatch(fetchCurrentUserRequest());

    if (!document) {
      throw "Document is not defined";
    }

    return fetch(userEndpoint, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `JWT ${getCookie(accessToken)}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.status_code >= 400) {
          throw json.error;
        }

        dispatch(fetchCurrentUserSuccess(json.id, json.todos));
      })
      .catch(err => {
        deleteCookie(accessToken);
        console.log(err);

        const errorMessage =
          err === "Invalid token"
            ? tokenError
            : "An error occured. Please login again.";

        dispatch(showNotification(errorMessage, true));
        dispatch(fetchCurrentUserFailure(err));
      });
  };
};

export const fetchCurrentUserRequest = () => {
  return {
    type: types.FETCH_CURRENT_USER_REQUEST
  };
};

export const fetchCurrentUserSuccess = (
  userID: number,
  todos: Array<Object>
) => {
  return {
    type: types.FETCH_CURRENT_USER_SUCCESS,
    userID,
    todos
  };
};

export const fetchCurrentUserFailure = (err: string) => {
  return {
    type: types.FETCH_CURRENT_USER_FAILURE,
    err
  };
};
