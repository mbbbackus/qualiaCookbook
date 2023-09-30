import Node from "./Node";

export default function placeNodes(data: Array<any>): Array<Node> {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const nodes: Node[] = [];
    const metaCircleRadius = Math.min(canvasWidth, canvasHeight) / 4;
    const numNodes = data.length;
    
    // place selected node, always first in the array, at the center of the canvas
    nodes.push(new Node(data[0]?.id, canvasWidth / 2, canvasHeight / 2, 80, data[0]?.image ? data[0].image : undefined));
    
    for (let i = 1; i < numNodes; i++) {
        const angle = (i / ((numNodes)/ 2)) * Math.PI; // Calculate the angle at which the element will be placed.
        const x = (metaCircleRadius * Math.cos(angle)) + (canvasWidth / 2);
        const y = (metaCircleRadius * Math.sin(angle)) + (canvasHeight / 2);
        nodes.push(new Node(data[i]?.id, x, y, 50));
    }
    return nodes;
}

// export default function makePresetNodes(): Array<Node> {
//   const canvasWidth = window.innerWidth;
//   const canvasHeight = window.innerHeight;
//   const presetNodes: Node[] = [];
//   const numCircles = 10;
//   const metaCircleRadius = Math.min(canvasWidth, canvasHeight) / 4;

//   presetNodes.push(new Node('0', canvasWidth / 2, canvasHeight / 2, 80, 'qclogo.png'));
//   for (let i = 0; i < numCircles; i++) {
//     const angle = (i / ((numCircles)/ 2)) * Math.PI; // Calculate the angle at which the element will be placed.
//     const x = (metaCircleRadius * Math.cos(angle)) + (canvasWidth / 2);
//     const y = (metaCircleRadius * Math.sin(angle)) + (canvasHeight / 2);
//     presetNodes.push(new Node(`${i+1}`, x, y, 50));
//   }
//   return presetNodes;
// }