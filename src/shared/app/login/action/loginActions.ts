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
            console.log(json[accessToken]);

            document.cookie = `${accessToken}=${json[accessToken]}; Path=/;`;
            return dispatch(loginPostSuccess());
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

export const dismissSessionExpiredNotification = (): Object => {
  return {
    type: types.HIDE_SESSION_EXPIRED_MESSAGE
  };
};
