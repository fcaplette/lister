import * as types from "./loginActionTypes";

import { loginEndpoint } from "../../../domain/api/endpoints";

export const loginPost = (email: string, password: string): Object => {
  const params = { email, password };

  fetch(loginEndpoint);
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
