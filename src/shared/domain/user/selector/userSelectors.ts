const getSegment = state => state.app.user;

export const getUserID = state => getSegment(state).id;
