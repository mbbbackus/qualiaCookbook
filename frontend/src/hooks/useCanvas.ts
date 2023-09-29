import React, { useState, useEffect, useRef } from 'react';
import Node from '../components/canvas/Node';

export const canvasWidth = window.innerWidth;
export const canvasHeight = window.innerHeight;

function makePresetNodes(): Array<Node> {
  const presetNodes: Node[] = [];
  const numCircles = 10;
  const metaCircleRadius = Math.min(canvasWidth, canvasHeight) / 4;
  presetNodes.push(new Node('0', canvasWidth / 2, canvasHeight / 2, 80, 'qclogo.png'));
  for (let i = 0; i < numCircles; i++) {
    const angle = (i / ((numCircles)/ 2)) * Math.PI; // Calculate the angle at which the element will be placed.
    const x = (metaCircleRadius * Math.cos(angle)) + (canvasWidth / 2);
    const y = (metaCircleRadius * Math.sin(angle)) + (canvasHeight / 2);
    presetNodes.push(new Node(`${i+1}`, x, y, 50));
  }
  return presetNodes;
}

export function useCanvas(): [Array<Node>, React.Dispatch<React.SetStateAction<Array<Node>>>, React.RefObject<HTMLCanvasElement>, number, number] {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [nodes, setNodes] = useState<Array<Node>>(makePresetNodes());
  
    useEffect(() => {
      const canvasObj = canvasRef.current;
      if (canvasObj) {
        const ctx: CanvasRenderingContext2D | null = canvasObj.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
          nodes.forEach((n) => { 
            n.draw(canvasRef, ctx);
          });
        }
      }
    }, [nodes]);
  
    return [nodes, setNodes, canvasRef, canvasWidth, canvasHeight];
  }