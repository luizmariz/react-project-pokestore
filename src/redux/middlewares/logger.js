const logger = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.group(action.type);
    console.log('Action: ', action);
  }

  const returnValue = next(action);

  if (process.env.NODE_ENV !== 'production') {
    console.log('New state: ', store.getState());
    console.groupEnd();
  }

  return returnValue;
};

export default logger;
