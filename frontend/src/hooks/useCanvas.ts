import React, { useState, useEffect, useRef } from 'react';
import Node from '../components/canvas/Node';


export function useCanvas(): [Array<Node>, React.Dispatch<React.SetStateAction<Array<Node>>>, React.RefObject<HTMLCanvasElement>, number, number] {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // const presetNodes = placeNodes(data);
  const [nodes, setNodes] = useState<Array<Node>>([]);
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);

  const draw = () => {
    const canvasObj = canvasRef.current;
    if (canvasObj) {
      const ctx: CanvasRenderingContext2D | null = canvasObj.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        nodes?.forEach((n) => {
          n.draw(canvasRef, ctx);
        });
      }
    }
  }

  useEffect(() => {
    setCanvasHeight(window.innerHeight);
    setCanvasWidth(window.innerWidth);
    draw();
  }, [nodes]);

  return [nodes, setNodes, canvasRef, canvasWidth, canvasHeight];
}