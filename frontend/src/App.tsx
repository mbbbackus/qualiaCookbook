import { useEffect } from 'react';
import './App.css';
import * as d3 from 'd3';

import { SimulationNodeDatum } from 'd3';

// RELEVANT LINKS
// Typescript d3 react example: https://github.com/ultrasonicsoft/d3-network-graph-editor/blob/main/src/App.tsx
// d3.event removed post d3 v6: https://stackoverflow.com/questions/64794711/d3-js-in-angular-property-event-does-not-exist-on-type-typeof-import
// d3 basic network graph tutorial: https://www.youtube.com/watch?v=y2-sgZh49dQ


// Define an interface for your node that extends SimulationNodeDatum
interface Node extends SimulationNodeDatum {
	name: string;
	radius?: number;
	x?: number;
	y?: number;
	vx?: number;
	vy?: number;
}

interface Link {
	source: Node;
	target: Node;
}

const nodes = [
	{ name: "Protoqualia" },
	{ name: "Metaqualia" },
	{ name: "Qualia"},
	{ name: "Awareness" },
	{ name: "Curation" },
	{ name: "Meditation" },
	{ name: "Flow" },
	{ name: "Alignment" },
	{ name: "Internal Empiricism" },
	{ name: "Qualia Cookbook", radius: 30  }
];

var graph = {
	nodes,
	links: [
		{ source: nodes[2], target: nodes[1] },
		{ source: nodes[0], target: nodes[1] },
		{ source: nodes[3], target: nodes[2] },
		{ source: nodes[9], target: nodes[8] },
		{ source: nodes[9], target: nodes[7] },
		{ source: nodes[9], target: nodes[2] },
		{ source: nodes[3], target: nodes[4] },
		{ source: nodes[4], target: nodes[6] },
		{ source: nodes[3], target: nodes[5] }
	]
};

function App() {
	const canvas = d3.select(".canvas");
	
	useEffect(() => {

		// let docWidth = document.body.clientWidth;
		// let docHeight = document.body.clientHeight;
		
		const canvas = d3.select<HTMLElement, any>(".canvas");
    
		// Ensure the node exists before attempting to access its properties
		const canvasNode = canvas.node();
		if (!canvasNode) return;
		
		const canvasRect = canvasNode.getBoundingClientRect();
		console.log(canvasRect);
	  
		canvas.append("circle")
			.attr('radius', 10)
			.attr('fill', 'red')
			.attr('cx', canvasRect.width / 2)
			.attr('cy', canvasRect.height / 2);


		canvas.append("svg")
			.attr("width", canvasRect.width)
			.attr("height", canvasRect.height)
			.attr("viewBox", `0 0 ${canvasRect.width} ${canvasRect.height}`)
			.attr("preserveAspectRatio", "xMidYMid meet")
			.enter();

		var svg = d3.select("svg");

		console.log(svg)
		window.addEventListener("resize", function() {
			let newWidth = document.body.clientWidth;
			let newHeight = document.body.clientHeight;
		
			svg.attr('width', newWidth)
			.attr('height', newHeight);
		});
		var width: number = parseInt(svg.attr("width"));
		var height: number = parseInt(svg.attr("height"));
		// var width = 1000;
		// var height = 1000;
		
		//intialize data

		
		var simulation = d3
			.forceSimulation<Node>(graph.nodes)
			.force(
			"link",
			d3
				.forceLink<Node, d3.SimulationLinkDatum<Node>>()
				.id(function(d: Node) {
				return d.name;
				})
				.distance(100)
				.links(graph.links)
			)
		
			.force("charge", d3.forceManyBody().strength(-2000))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.on("tick", ticked);
		
		var link = svg
			.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data<Link>(graph.links)
			.enter()
			.append("line")
			.attr("stroke-width", 3);
		
		var radius = 20;
		var node = svg
			.append("g")
			.attr("class", "nodes")
			.selectAll(".node")
			.data<Node>(graph.nodes)
			.enter()
			.append("g")
			.call(
				d3
					.drag<any, any>()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended)
				)
			.attr("class", "node")
			.each(function(d) {
				d3.select(this)
				.append("circle")
				.attr("fill", "red")
				.attr("r", d.radius || radius)
				.on("click", async function(e) {
					console.log(d)
				});
				d3.select(this)
				.append("text")
				.attr("dy", (d.radius || radius) + 20)
				.style("text-anchor", "middle")
				// .style("font-size", "15px")
				.text(d.name)
			})
		  
			function ticked() {
			  link
				.attr("x1", function(d) {
				  return d.source.x!;
				})
				.attr("y1", function(d) {
				  return d.source.y!;
				})
				.attr("x2", function(d) {
				  return d.target.x!;
				})
				.attr("y2", function(d) {
				  return d.target.y!;
				});
		  
			  node.attr("transform", function(d) {
				  return "translate(" + d.x + "," + d.y + ")";
			  });
		  
			}
		  
			function dragstarted(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: Node) {
			  if (!event?.active) simulation.alphaTarget(0.3).restart();
			  d.fx = d.x;
			  d.fy = d.y;
			}
		  
			function dragged(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: Node) {
			  d.fx = event.x;
			  d.fy = event.y;
			}
		  
			function dragended(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: Node) {
			  if (!event?.active) simulation.alphaTarget(0);
			  d.fx = null;
			  d.fy = null;
			}
	}, []);

	return (
		<div className="App">
			<div className="canvas"></div>
		</div>
  	);
}

export default App;
