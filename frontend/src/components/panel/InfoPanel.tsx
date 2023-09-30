import { useState, useEffect } from 'react';

function InfoPanel(props: any) {

  const node = props.node;

  // useEffect(() => {
    
  // }, [])

  return (
    <div className="info-panel">
      <span>{node?.name}</span>
    </div>
  );
}

export default InfoPanel;
  