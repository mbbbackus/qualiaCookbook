import InfoPanel from "./panel/InfoPanel";
import GraphCanvas from "./canvas/GraphCanvas";
import { useEffect, useState } from "react";
import tempData from "../tempData";
import "../styles/LayoutContainer.css";

// This component will communicate with the API and retrieve
// a list of nodes based on which one is currently selected.
// If none are selected (and nothin in the cache), it will
// default to the node for the qualia cookbook
function LayoutContainer() {

  const [nodeId, setNodeId] = useState<string | null>(null);
  const [selectedNode, setNode] = useState<any | null>(null); 

  // On pageload, pull from localStorage or default to qualia cookbook
  useEffect(() => {
    const nodeId = localStorage.getItem("nodeId") || '0';
    setNodeId(nodeId);
    setNode(tempData.nodes.filter(node => node.id === nodeId)[0]);
  
  }, []);

  // On change of nodeId, update localStorage and set the node
  useEffect(() => {
    if (nodeId) {
      localStorage.setItem("nodeId", nodeId);
      setNode(tempData.nodes.filter(node => node.id === nodeId)[0]);
    }
  }, [nodeId]);

  return (
    <div className="layout-container">
      <div className="canvas-container"> 
        <GraphCanvas selectedNode={selectedNode} setNodeId={setNodeId}/>
      </div>
      {selectedNode && 
        <div className="info-panel-container">
          <InfoPanel node={selectedNode}/>
        </div>
      }
    </div>
  );
}

export default LayoutContainer;
