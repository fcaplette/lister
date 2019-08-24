const getSegment = state => state.app.user;

export const getUserName = state => getSegment(state).username;
export const getUserID = state => getSegment(state).id;
