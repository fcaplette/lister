import * as types from "./signupActionTypes";

import { getResponseErrorMessage } from "../../../domain/util/apiUtils";
import { signupEndpoint } from "../../../domain/api/endpoints";

export function registerUser(username, password): Object {
  return dispatch => {
    dispatch(registerUserRequest());

    return fetch(signupEndpoint, {
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
          dispatch(registerUserSuccess());
        }
      })
      .catch(exception => {
        if (typeof exception === "string") {
          dispatch(registerUserFailure(exception));
        } else {
          dispatch(
            registerUserFailure(
              "There was an error while signing you up. Please try again."
            )
          );
        }
        throw exception;
      });
  };
}

export const registerUserRequest = (): Object => {
  return {
    type: types.REGISTER_USER_REQUEST
  };
};

export const registerUserSuccess = (): Object => {
  return {
    type: types.REGISTER_USER_SUCCESS
  };
};

export const registerUserFailure = (exception: string): Object => {
  return {
    type: types.REGISTER_USER_FAILURE,
    exception
  };
};
