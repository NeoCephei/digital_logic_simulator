import React, {useEffect, useRef}from 'react'

import { BallMovement } from './ballMovement'
import WallCollision from './wallCollision'
import data from '../../data'


let x = 0;

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let { ballObj} = data;

      BallMovement(ctx, ballObj)
      WallCollision (ballObj, canvas)

      requestAnimationFrame(render);
    }
    render();
  },[])

  return <canvas id="canvas" ref={canvasRef} height="400" width="600"/>
}
