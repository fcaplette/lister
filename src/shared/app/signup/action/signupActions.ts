import * as types from "./signupActionTypes";

import { signupEndpoint } from "../../../domain/api/endpoints";

export const signupPost = (email: string, password: string): Object => {
  const params = { email, password };

  //TODO: Implement logic to call api with redux-thunk
  fetch(signupEndpoint);
};

export const signupPostRequest = (): Object => {
  return {
    type: types.SIGNUP_REQUEST
  };
};

export const signupPostSuccess = (): Object => {
  return {
    type: types.SIGNUP_SUCCESS
  };
};

export const signupPostFailure = (exception: string): Object => {
  return {
    type: types.SIGNUP_FAILURE,
    exception
  };
};
