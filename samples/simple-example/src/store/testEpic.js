export const testEpic = (action$) => {
  return action$
    .ofType('PING')
    .mapTo({ type: 'PONG' });
};
