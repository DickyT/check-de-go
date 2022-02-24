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

const FONTS = [
  {
    name: 'MICR',
    url: 'https://raw.githubusercontent.com/garily/check-de-go/master/src/static/micrenc.ttf',
  },
  {
    name: 'Spoqa Han Sans Neo Regular',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/3.2.1/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf',
  },
  {
    name: 'Spoqa Han Sans Neo Medium',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/3.2.1/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf',
  },
  {
    name: 'Roboto Mono',
    url: 'https://fonts.cdnfonts.com/s/16061/RobotoMono-Regular.woff',
  },
].map(({ name, url }) => new FontFace(name, `url('${url}')`));

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
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
  }, [canvasHeight, canvasWidth, getContext, pixelRatio, width, height]);

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

export function loadImg(url?: string): Promise<HTMLImageElement | undefined> {
  return new Promise((resolve) => {
    if (url == null) {
      resolve(undefined);
      return;
    }
    const imgLoader = new Image();
    imgLoader.crossOrigin = 'anonymous';
    imgLoader.onload = () => resolve(imgLoader);
    imgLoader.onerror = () => resolve(undefined);
    imgLoader.src = url;
  });
}

export function loadFonts(): Promise<void> {
  return new Promise((resolve, reject) => {
    const loadedFonts = FONTS.reduce(
      (acc, font) => acc + (font.status === 'loaded' ? 1 : 0),
      0,
    );
    if (loadedFonts < FONTS.length) {
      let loadedCount = 0;
      FONTS.forEach((fontFace) => fontFace
        .load()
        .then((font) => {
          document.fonts.add(font);
          loadedCount += 1;
          if (loadedCount === FONTS.length) {
            resolve();
          }
        })
        .catch(() => reject()));
    } else {
      resolve();
    }
  });
}
