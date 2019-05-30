import * as types from "./signupActionTypes";
import { getResponseErrorMessage } from "../../../domain/util/apiUtils";

import { signupEndpoint } from "../../../domain/api/endpoints";

export function registerUser(email, password): Object {
  return dispatch => {
    dispatch(registerUserRequest());

    return fetch(signupEndpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);

        if (getResponseErrorMessage(json)) {
          console.log("API error");

          throw getResponseErrorMessage(json);
        } else {
          return dispatch(registerUserSuccess());
        }
      })
      .catch(exception => {
        if (typeof exception === "string") {
          dispatch(registerUserFailure(exception));
        } else {
          dispatch(registerUserFailure("Something went wrong"));
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
