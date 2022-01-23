import * as React from 'react';
import {useEffect, useRef} from 'react';

import './CheckCanvas.css';

interface Props {

}

export default function CheckCanvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }, []);

  return (
    <canvas ref={canvasRef}/>
  )
}