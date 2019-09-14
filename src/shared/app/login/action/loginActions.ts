import * as types from "./loginActionTypes";

import {
  loginEndpoint,
  storeTokenEndpoint
} from "../../../domain/api/endpoints";

import { accessToken } from "../settings/loginSettings";
import { getCookie } from "../../base/browser/browserUtils";
import { getResponseErrorMessage } from "../../../domain/util/apiUtils";

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
          if (document && json[accessToken]) {
            document.cookie = `${accessToken}=${json[accessToken]}; Path=/;`;
            return dispatch(loginPostSuccess());
          } else {
            dispatch(loginPostFailure());
          }
        }
      })
      .catch(exception => {
        dispatch(
          loginPostFailure("This email and password combination is not valid.")
        );
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

export const showNotification = (
  exception: string,
  isError: boolean
): Object => {
  return {
    type: types.SHOW_NOTIFICATION,
    message: exception,
    isError
  };
};

export const dismissNotification = (): Object => {
  return {
    type: types.DISMISS_NOTIFICATION
  };
};
