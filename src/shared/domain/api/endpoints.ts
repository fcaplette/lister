const apiUrl = "http://localhost:5000";

export const loginEndpoint = `${apiUrl}/auth`;
export const signupEndpoint = `${apiUrl}/signup/`;
export const addTodoEndpoint = `${apiUrl}/add_todo/`;
export const patchTodoEndpoint = `${apiUrl}/todo/`;
export const userEndpoint = id => `${apiUrl}/user/${id}`;
