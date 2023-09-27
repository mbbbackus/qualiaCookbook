import React, { useRef, useEffect } from 'react';
import { useCanvas } from '../../hooks/useCanvas';
import Node from './Node';

const GraphCanvas = () => {
  const [ nodes, setNodes, canvasRef, canvasWidth, canvasHeight ] = useCanvas();

  const handleCanvasClick=(event: React.MouseEvent<HTMLElement>)=>{
    const currentCoord = { x: event.clientX, y: event.clientY };
    for (const node of nodes) {
      if (node.contains(currentCoord.x, currentCoord.y)){
        console.log("clicked node: ", node);
      }
    }
  };

  const handleCanvasMouseMove=(event: React.MouseEvent<HTMLElement>)=>{
    const canvasObj  = canvasRef.current;
    if (!canvasObj) return;
    const currentCoord = { x: event.clientX, y: event.clientY };
    let cursorInNode = false;
    for (const node of nodes) {
      if (node.contains(currentCoord.x, currentCoord.y)){
        cursorInNode = true;
      } 
    }
    canvasObj!.style.cursor = cursorInNode ? "pointer" : "default";
  };

  return <div>
    <canvas 
      className="App-canvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onMouseMove={handleCanvasMouseMove}
      onClick={handleCanvasClick}
    />

  </div>;
};

export default GraphCanvas;

// TODO
// 1. Render nodes on load, have draw function 

// MVP:
// 1. Clickable nodes
  // 1.1 Draw node function of (x,y,diameter) on canvas
    // 1.1.1 Add image to node function
  // 1.2 Add text to node function
  // 1.3 Add on click event to node
    // 1.3.0 Write code for mapping mouse even on the screen to nodes on the canvas
    // 1.3.1 Show info panel on click
    // 1.3.2 Highlight node on click
    // 1.3.3 Add hit mask and hit testing to optimize
  // 1.4 Add on hover event to node (expand, show tooltip)
  // 1

// 2. Edges between nodes
// 2.5 Define data props of nodes and edges w/r/t relationships and locations
// 3. Qualia cookbook node w/ image
// 4. Nodes read json file
