// remove linter disable when add more exports
// eslint-disable-next-line import/prefer-default-export
export const preventDefaultHandler = (handler) => (event) => {
  event.preventDefault();
  handler(event);
};
