import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nodes } from './nodes';
import { links } from './links';
import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';
import './Graph.css';

// RELEVANT LINKS
// Typescript d3 react example: https://github.com/ultrasonicsoft/d3-network-graph-editor/blob/main/src/App.tsx
// d3.event removed post d3 v6: https://stackoverflow.com/questions/64794711/d3-js-in-angular-property-event-does-not-exist-on-type-typeof-import
// d3 basic network graph tutorial: https://www.youtube.com/watch?v=y2-sgZh49dQ

interface Node extends SimulationNodeDatum {
	id: string;
	name: string;
	symbol: string;
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

var graph = {
	nodes,
	links: links.map((link) => {
		return {
			source: nodes.find((node) => node.id === link.source)!,
			target: nodes.find((node) => node.id === link.target)!,
		}
	})
};

function Graph() {
	const navigate = useNavigate();
	let { selectedId } = useParams();

	const [showArticleLink, setShowArticleLink] = React.useState<boolean>(selectedId ? true : false);
	const [centeredNode, setCenteredNode] = React.useState<Node | null>(nodes.find((node) => node.id === selectedId) || null);

	const goToArticle = () => {
		const articleId = !!centeredNode ? centeredNode.id : '';
		navigate(`/article/${articleId}`);
	};

	const changePage = (nodeId: any) => {
		navigate(`/${nodeId}`);
	};

	const isMobile = () => {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	useEffect(() => {
		if (selectedId) {
			setShowArticleLink(true);
		} else {
			setShowArticleLink(false);
		}

		d3.selectAll("svg > *").remove();
		const canvas = d3.select<HTMLElement, any>(".canvas");
    
		// Ensure the node exists before attempting to access its properties
		const canvasNode = canvas.node();
		if (!canvasNode) return;
		
		const canvasRect = canvasNode.getBoundingClientRect();

		canvas.append("svg")
			.attr("width", canvasRect.width)
			.attr("height", canvasRect.height)
			.attr("viewBox", `0 0 ${canvasRect.width} ${canvasRect.height}`)
			.attr("preserveAspectRatio", "xMidYMid meet")
			.enter();

		var svg = d3.select("svg");

		window.addEventListener("resize", function() {
			let newWidth = document.body.clientWidth;
			let newHeight = document.body.clientHeight;
		
			svg.attr('width', newWidth)
				.attr('height', newHeight);
		});

		var width: number = parseInt(svg.attr("width"));
		var height: number = parseInt(svg.attr("height"));
		var radius: number = 40;

		function moveToCenter(d: any, context: SVGCircleElement) {
			d3.select(context)
				.transition()
				.duration(750)
				.tween("moveToCenter", () => {
					const ix = d3.interpolate(d.x, width / 2);
					const iy = d3.interpolate(d.y, height / 2);
					return function(t: any) {
						d.fx = ix(t);
						d.fy = iy(t);
						simulation.alpha(1).restart();
					};
				});

			d3.select('#centered').attr('id', null).each(function(d:any) {
				d.fx = null;
				d.fy = null;
			});
			d3.select(context).attr('id', 'centered');
			setCenteredNode(d);
		}

		function centerNode(d: any, context: SVGCircleElement) {
			if (centeredNode?.id !== d.id) {
				// Animate the transition to the center
				d3.select(context)
				  .transition()
				  .duration(750)
				  .tween("moveToCenter", () => {
					  const ix = d3.interpolate(d.x, width / 2);
					  const iy = d3.interpolate(d.y, height / 2);
					  return function(t: any) {
						  d.fx = ix(t);
						  d.fy = iy(t);
						  simulation.alpha(1).restart();
					  };
				  });
	
				d3.select('#centered').attr('id', null).each(function(d:any) {
					d.fx = null;
					d.fy = null;
				});
				d3.select(context).attr('id', 'centered');
				setCenteredNode(d);
				changePage(d.id);
			} else {
				// Uncenter the node if it's clicked again
				setShowArticleLink(!showArticleLink);
				d.fx = null;
				d.fy = null;
				setCenteredNode(null);
				changePage('');
			}
	
			simulation.alpha(1).restart();
		}

		
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
			.force("vertical", d3.forceX(width / 2).strength(0.1))
			.on("tick", ticked);

		var container = svg.append("g");
		
		var link = container
			.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data<Link>(graph.links)
			.enter()
			.append("line")
			.attr("stroke-width", 3);
		
		var node = container
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
				d3.select(this).append("text")
					.attr("dx", 0)
					.attr("dy", ".35em")
					.text(function(e) { return d.symbol; }) 
					.style("font-size", "64px")
					.style("text-anchor", "middle");
				const circle = d3.select(this).append("circle")
					.attr("r", d.radius || radius)
					.attr("opacity", 0)
					.on("click", function(e) {
						centerNode(d, this);
					});
				
				if (d.id === selectedId) {
					// centerNode(d, circle.node()!);
					const context = circle.node()!;
					moveToCenter(d, context);
				}
				
				d3.select(this).append("text")
					.attr("dy", (d.radius || radius) + 20)
					.style("text-anchor", "middle")
					.text(d.name);	
			});


		/* ZOOM and PAN config */
		const initialZoomLevel = isMobile() ? 0.5 : 1;
			
		function handleZoom(e: any) {
			container.attr("transform", e.transform);
		}
		
		let zoom = d3.zoom<HTMLElement, unknown>()
			.on('zoom', handleZoom)
			.scaleExtent([0.5, 2]);
		
		d3.select<HTMLElement, unknown>('svg')
			.call(zoom)
			.call(zoom.transform, 
				d3.zoomIdentity
					.translate(width / 2, height / 2)
					.scale(initialZoomLevel)
					.translate(-width / 2, - height / 2)
			);
		
		
		/* TICK and DRAG methods */	
		  
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
	}, [centeredNode]);

	return (
		<div className="graph-container">
			<div className="canvas"></div>
			{!showArticleLink ? (
				''
			) : (
				<div className="article-link" onClick={() => goToArticle()}>
					<div className="article-link-icon">
						{!!centeredNode ? centeredNode.symbol : ''}
					</div>
					<div className="article-link-text">
						{!!centeredNode ? centeredNode.name : ''}
					</div>
				</div>
			)}
		</div>
  	);
}

export default Graph;
