import useAwait from 'react-use-await';
import {
  useState, useEffect, useRef,
} from 'react';

export function usePromise<A extends any[], R>(
  promise: (..._fnArgs: A) => Promise<R>,
  ...args: A
): R {
  return useAwait(promise, args);
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Tracks previous state of a value.
 *
 * @param value Props, state or any other calculated value.
 * @returns Value from the previous render of the enclosing component.
 *
 * @example
 * function Component() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *   // ...
 *   return `Now: ${count}, before: ${prevCount}`;
 * }
 */
export function usePrevious<T>(value: T): T | undefined {
  // Source: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
