import React, { useEffect } from 'react';
import { CheckCanvasBaseProps } from './CheckCanvas';
import { useCheckCanvas } from './utils';

export default React.forwardRef(({
  className,
  previewMode = false,
  scale = 1,
}: CheckCanvasBaseProps, ref) => {
  const {
    canvasRef,
    unit,
    getContext,
    width,
    height,
    canvasWidth,
    canvasHeight,
    resetCanvas,
  } = useCheckCanvas({
    ref,
    scale,
    previewMode,
  });

  useEffect(() => {
    resetCanvas();
  }, [resetCanvas]);

  return (
    <canvas
      className={className}
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ width, height }}
    />
  );
});
