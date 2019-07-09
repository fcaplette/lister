import * as types from "./loginActionTypes";

import { loginEndpoint } from "../../../domain/api/endpoints";
import { getResponseErrorMessage } from "../../../domain/util/apiUtils";

export const loginPost = (email: string, password: string): Object => {
  return dispatch => {
    dispatch(loginPostRequest());

    return fetch(loginEndpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(json => {
        if (getResponseErrorMessage(json)) {
          throw getResponseErrorMessage(json);
        } else {
          return dispatch(loginPostSuccess());
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

export const loginPostSuccess = (): Object => {
  return {
    type: types.LOGIN_SUCCESS
  };
};

export const loginPostFailure = (exception: string): Object => {
  return {
    type: types.LOGIN_FAILURE,
    exception
  };
};
