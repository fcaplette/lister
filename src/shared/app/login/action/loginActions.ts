import * as types from "./loginActionTypes";

import { loginEndpoint } from "../../../domain/api/endpoints";
import { getResponseErrorMessage } from "../../../domain/util/apiUtils";
import { accessToken } from "../settings/loginSettings";

export const loginPost = (username: string, password: string): Object => {
  return dispatch => {
    dispatch(loginPostRequest());

    return fetch(loginEndpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(json => {
        if (getResponseErrorMessage(json)) {
          throw getResponseErrorMessage(json);
        } else {
          if (document && json.access_token) {
            document.cookie = `${accessToken}=${json.access_token}; Path=/;`;
            return dispatch(loginPostSuccess(username));
          } else {
            dispatch(loginPostFailure());
          }
        }
      })
      .catch(exception => {
        if (typeof exception === "string") {
          dispatch(loginPostFailure(exception));
        } else {
          dispatch(loginPostFailure("Something went wrong"));
        }
        throw exception;
      });
  };
};

export const loginPostRequest = (): Object => {
  return {
    type: types.LOGIN_REQUEST
  };
};

export const loginPostSuccess = (username: string): Object => {
  return {
    type: types.LOGIN_SUCCESS,
    username
  };
};

export const loginPostFailure = (exception: string): Object => {
  return {
    type: types.LOGIN_FAILURE,
    exception
  };
};
