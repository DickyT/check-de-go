import React, { useEffect } from 'react';
import { CheckCanvasBaseProps } from './CheckCanvas';
import { loadFonts, useCheckCanvas, usePromise } from './utils';

export default React.forwardRef(({
  className,
  previewMode = false,
  scale = 1,
}: CheckCanvasBaseProps, ref) => {
  usePromise(loadFonts);

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
    const ctx = getContext();
    resetCanvas();

    ctx.save();
    ctx.rotate(0.5 * Math.PI);
    ctx.translate(unit(0), -width);
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';

    ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Regular'`;
    ctx.textAlign = 'start';
    ctx.fillText('ENDORSE HERE', unit(20), unit(20));

    ctx.font = `${unit(20)}px 'Spoqa Han Sans Neo Regular'`;
    ctx.fillText('✕', unit(20), unit(70));

    ctx.beginPath();
    ctx.moveTo(unit(20), unit(90));
    ctx.lineTo(height - unit(20), unit(90));
    ctx.lineWidth = unit(1.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(unit(20), unit(150));
    ctx.lineTo(height - unit(20), unit(150));
    ctx.lineWidth = unit(1.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(unit(20), unit(210));
    ctx.lineTo(height - unit(20), unit(210));
    ctx.lineWidth = unit(1.5);
    ctx.stroke();

    ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Medium'`;
    ctx.textAlign = 'center';
    ctx.fillText('DO NOT WRITE, STAMP, OR SIGN BELOW THIS LINE', height / 2, unit(220));

    ctx.font = `${unit(12)}px 'Spoqa Han Sans Neo Regular'`;
    ctx.fillText('** RESERVED FOR FINANCIAL INSTITUTION USE **', height / 2, unit(235));

    ctx.beginPath();
    ctx.moveTo(unit(20), unit(255));
    ctx.lineTo(height - unit(20), unit(255));
    ctx.lineWidth = unit(1.5);
    ctx.stroke();

    ctx.restore();
  }, [resetCanvas, getContext, width, height, unit]);

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
