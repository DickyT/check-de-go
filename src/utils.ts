import useAwait from 'react-use-await';

// eslint-disable-next-line import/prefer-default-export
export function usePromise<A extends any[], R>(
  promise: (..._fnArgs: A) => Promise<R>,
  ...args: A
): R {
  return useAwait(promise, args);
}
