import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import tempData, {QUALIA_COOKBOOK_ID} from '../../tempData';



function GraphCanvas(props: any) {
  let selectedNodeId = props.selectedNodeId;
  const setNodeId = props.setNodeId;
  const selectedNode = props.selectedNode;

  useEffect(() => {
    // const elements = [
    //   { data: { id: 'node1' }},
    //   { data: { id: 'node2' }},
    //   { data: { id: 'node3' }},
    //   { data: { id: 'node4' }},
    //   { data: { id: 'node5' }},
    //   { data: { id: 'node6' }},
    //   { data: { id: 'edge1', source: 'node2', target: 'node1' } },
    //   { data: { id: 'edge2', source: 'node3', target: 'node1' } },
    //   { data: { id: 'edge3', source: 'node4', target: 'node1' } },
    //   { data: { id: 'edge4', source: 'node5', target: 'node1' } },
    //   { data: { id: 'edge5', source: 'node6', target: 'node1' } }
    // ];
    // get node from tempData by selectedNodeId
    if (!selectedNodeId) { 
      setNodeId(QUALIA_COOKBOOK_ID);

      selectedNodeId = QUALIA_COOKBOOK_ID;
    };
    const selectedNode = tempData.nodes.filter((n) => n.id === selectedNodeId)[0];
    const selNodeObj = {data: {id: selectedNode.id}};
    const edges = selectedNode.connections.map((c) => { return {
      data: {
        id: `${selectedNode.id}-${c}`, 
        source: selectedNode.id, 
        target: c
      }
    }});
    const nodes = selectedNode.connections.map((c) => {return {data: {id: c}}});
    const elements = [selNodeObj, ...nodes, ...edges];
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements: elements?.length ? elements : [],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'white',
            'border-color': 'black',
            'border-width': 0.1,
            width: 4,
            height: 4,
            label: 'data(id)',
            'font-size': 1,
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 0.1,
            'line-color': 'black'
          }
        }
      ]
    },);

    cy.layout({ name: 'concentric' }).run();

    cy.on('click', 'node', function(evt){
      const selectedId = evt.target.data('id')
      console.log(selectedId);
      setNodeId(selectedId);
    });
  }, [selectedNode]);

  return (
    <div id="cy" style={{ width: '100%', height: '100vh', position: 'absolute' }}></div>

  );
}

export default GraphCanvas;
