export const getNotificationMessage = (state: Object): string => {
  return state.app.notification.message;
};

export const getNotificationIsError = (state: Object): string => {
  return state.app.notification.isError;
};
