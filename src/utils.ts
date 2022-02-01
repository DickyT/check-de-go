import useAwait from 'react-use-await';
import React, {
  useState, useEffect, useRef, useCallback, useMemo, useImperativeHandle,
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

export const CHECK_ORIGINAL_WIDTH = 900;
export const CHECK_ORIGINAL_HEIGHT = 350;

export interface CheckCanvasRef {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}

export function useCheckCanvas({
  ref,
  scale,
  previewMode,
}: Readonly<{
  ref: React.ForwardedRef<any>,
  scale: number,
  previewMode: boolean,
}>): Readonly<{
  /* eslint-disable @typescript-eslint/indent */
  canvasRef: React.RefObject<HTMLCanvasElement>,
  unit: (_: number) => number,
  getContext: () => CanvasRenderingContext2D,
  width: number,
  height: number,
  canvasWidth: number,
  canvasHeight: number,
  resetCanvas: () => void,
}> {
  /* eslint-enable @typescript-eslint/indent */
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const unit = useCallback((val: number) => scale * val, [scale]);
  const getContext = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas!.getContext('2d')!;
  }, []);

  const refHandle = useMemo(() => () => ({
    canvas: canvasRef.current!,
    context: getContext(),
  }), [getContext]);
  useImperativeHandle(ref, refHandle);

  const pixelRatio = previewMode ? window.devicePixelRatio : 1;

  const width = unit(CHECK_ORIGINAL_WIDTH);
  const canvasWidth = width * pixelRatio;

  const height = unit(CHECK_ORIGINAL_HEIGHT);
  const canvasHeight = height * pixelRatio;

  const resetCanvas = useCallback(() => {
    const ctx = getContext();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }, [canvasHeight, canvasWidth, getContext, pixelRatio]);

  return {
    canvasRef,
    unit,
    getContext,
    width,
    height,
    canvasWidth,
    canvasHeight,
    resetCanvas,
  };
}
