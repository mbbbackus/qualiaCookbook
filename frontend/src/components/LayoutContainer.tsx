import InfoPanel from "./panel/InfoPanel";
import GraphCanvas from "./canvas/GraphCanvas";
function LayoutContainer() {
  return (
    <div className="layout-container">
      <GraphCanvas />
      <InfoPanel />
    </div>
  );
}

export default LayoutContainer;
