export const makeQueue = () => {
  let promise: Promise<any> = Promise.resolve();

  function push<T>(fn: () => Promise<T>): Promise<T>;
  function push<T>(fn: () => T): Promise<T> {
    promise = promise.then(fn, fn);
    return promise;
  }

  return {
    push,
  };
};
