/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//this will be the final route finder function
function findAllShortWays(source, goal, data, PFS) {

	var threshold = parseFloat(document.getElementById("threshold").value);
	var asphaltOnly = document.getElementById("asphalt").checked;

	//reminder: SSSP result is an array containing the parentDict and the shortest distance
	var SSSPresult;
	var edgeNode = createEdgeNodeLists(data, asphaltOnly);

	if (PFS === true) {
		SSSPresult = edgeFocusedPFS(source, goal, threshold, data, asphaltOnly);
	} else {
		SSSPresult = BellmanFord(source, goal, threshold, edgeNode);
	}

	var parents = SSSPresult[0];
	var shortestDist = SSSPresult[1];

	//setting the maxDist - any backtracked route longer than this will be discarded
	var maxDist = shortestDist + threshold;

	//initialize the nodes crossed list, goal is to filter out turnbacks
	var nodesCrossed = {};
	var nodes = edgeNode[1];

	//initialize the leadArray and leadCounter, to handle branchings
	var leadArray = [];
	var leadCounter = 0;

	//initialize the return object array
	var results = [];

	//var testCounter = 0;
	//tracking back all possible paths, one at a time
	do {
		//testCounter++;
		for (var node in nodes) {
			nodesCrossed[node] = false;
		}

		var actualNode = goal;
		var path = [];
		var dist = 0;
		var validPath = true;
		leadCounter = 0;

		//tracking back a possible path
		while (actualNode !== source && validPath === true) {
			nodesCrossed[actualNode] = true;
			var parOfAct = parents[actualNode]; //an object dictionary
			var parKeys = Object.keys(parOfAct); //an array of keys
			var actualEdge;

			//lets take the simplest case first - no branching
			if (parKeys.length === 1) {
				actualEdge = parKeys[0];
			} else {
				leadCounter++;
				//case: branching not yet covered by the leadArray
				if (leadCounter > leadArray.length) {
					leadArray.push([0, parKeys.length]);
					actualEdge = parKeys[0];
					//case: branching covered by the leadArray
				} else {
					var parKeypos = leadArray[leadCounter - 1][0];
					actualEdge = parKeys[parKeypos];
				}
			}

			actualNode = actualEdge.substring(0, 3);
			dist += parOfAct[actualEdge];
			path.push(actualEdge);

			//now the hook to avoid turnbacks
			if (nodesCrossed[actualNode] === true) {
				validPath = false;
			}

			//and the hook to avoid too long/false paths - needs a little buffering in some cases!
			if (dist > maxDist + 0.1) {
				validPath = false;
			}
		}

		if (validPath === true) {
			path = path.reverse();
			var pathObject = {"path": path, "dist": dist};
			results.push(pathObject);
		}

		//now need to update the leadArray, if not empty
		if (leadArray.length > 0) {
			leadArray[leadArray.length - 1][0] = leadArray[leadArray.length - 1][0] + 1;

			while (leadArray[leadArray.length - 1][0] === leadArray[leadArray.length - 1][1]) {
				leadArray.pop();
				if (leadArray.length === 0) {
					break;
				}
				leadArray[leadArray.length - 1][0] = leadArray[leadArray.length - 1][0] + 1;
			}
		}
	} while (leadArray.length > 0);
	//alert("initiated " + testCounter + " times");

	return results;

}

//TODO: test if the asphaltOnly hook works correctly! (can test once non-asphalt segments are included)
function createEdgeNodeLists(data, asphaltOnly) {
	var edgeNames = Object.keys(data);
	var edgeList = {};
	var nodeList = {};
	for (name of edgeNames) {
		if (asphaltOnly === true && data[name].asphalt === false) {
			continue;
		}
		var edgeObject = {};
		var startN = name.substring(0, 3);
		edgeObject.start = startN;
		var endN = name.substring(4, 7);
		edgeObject.end = endN;
		if (!nodeList[startN]) {
			nodeList[startN] = 1;
		}
		if (!nodeList[endN]) {
			nodeList[endN] = 1;
		}
		edgeObject.weight = data[name].length;
		edgeList[name] = edgeObject;
	}
	return [edgeList, nodeList];
}

//input of the function is the return value of the createEdgeNodeLists
//prepares a node-edges dict for the edgeFocusedPFS
function listEdgesOfNodes(edgesAndNodes) {
	var nodes = edgesAndNodes[1];
	var edges = edgesAndNodes[0];

	//create the return dict
	var edgesByNodes = {};
	for (var node in nodes) {
		edgesByNodes[node] = {};
	}

	for (var edge in edges) {
		edgesByNodes[edges[edge].start][edge] = edges[edge].weight;
	}

	return edgesByNodes;
}

//gives false positives because of direct turnbacks - eliminate them here, or just at backtracking?
function BellmanFord(source, goal, threshold, EandN) {
	var edgeList = EandN[0];
	var nodeList = EandN[1];
	var nodes = Object.keys(nodeList);
	var dists = {};
	var parentEdges = {};
	//initialization
	for (var node of nodes) {
		dists[node] = Number.POSITIVE_INFINITY;
		parentEdges[node] = {};
	}

	//initialize for source node
	dists[source] = 0;
	parentEdges[source] = {"stop": 0};

	for (i = 0; i < nodes.length; i++) {
		var anythingChanged = false;
		for (var key in edgeList) {
			var edge = edgeList[key];
			//HOOK better path found
			if (dists[edge.end] > dists[edge.start] + edge.weight) {
				dists[edge.end] = dists[edge.start] + edge.weight;
				parentEdges[edge.end] = {};
				parentEdges[edge.end][key] = edge.weight;
				anythingChanged = true;
			}

			//HOOK inRange path found - eliminating turnbacks?
			else if (dists[edge.end] + threshold >= dists[edge.start] + edge.weight) {
				parentEdges[edge.end][key] = edge.weight;
				anythingChanged = true;
			}
		}
		if (anythingChanged === false) {
			break;
		}
	}
	return [parentEdges, dists[goal]];
}

//PFS based traversal as an alternative for the Bellman-Ford
function starterPFS(source, goal, data, asphaltOnly) {
	//first make adjacency list with shortest distances
	var adjListShortest = {};
	var sectionNames = Object.keys(data);
	for (name of sectionNames) {
		if (asphaltOnly === true && data[name][asphalt] === false) {
			continue;
		}
		var start = name.substring(0, 3);
		var end = name.substring(4, 7);
		var weight = data[name].length;
		if (!adjListShortest[start]) {
			adjListShortest[start] = {};
		}
		//do the same for the end node, then it is guaranteed that all nodes are represented in the adjList
		if (!adjListShortest[end]) {
			adjListShortest[end] = {};
		}
		if (!adjListShortest[start][end]) {
			adjListShortest[start][end] = weight;
		} else if (adjListShortest[start][end] > weight) {
			adjListShortest[start][end] = weight;
		}
	}

	//now the graph traversal until reaching the goal node only!
	var nodes = Object.keys(adjListShortest);
	var dists = {};
	var closedNodes = {};
	var prioQ = {};
	//filling up the dicts
	for (node of nodes) {
		dists[node] = Number.POSITIVE_INFINITY;
		closedNodes[node] = false;
	}

	//initialize for start node
	dists[source] = 0;
	prioQ[source] = 0;
	while (Object.keys(prioQ).length > 0) {

		var currentNode;
		//getting the current node (lowest priority)
		var values = Object.values(prioQ);
		var minValue = Math.min.apply(Math, values);
		for (var key in prioQ) {
			if (prioQ[key] === minValue) {
				currentNode = key;
				delete prioQ[key];
				break;
			}
		}

		closedNodes[currentNode] = true;
		if (currentNode === goal) {
			break;
		}

		//else, discovering neighborhood
		var neighbors = adjListShortest[currentNode];
		for (var node in neighbors) {
			if (closedNodes[node] === false) {
				//better path found
				if (dists[node] > dists[currentNode] + neighbors[node]) {
					dists[node] = dists[currentNode] + neighbors[node];
					prioQ[node] = dists[currentNode] + neighbors[node];
				}
				//put node into prioQ if it is not yet there
				else if (!prioQ[node]) {
					prioQ[node] = dists[currentNode] + neighbors[node];
				}
			}
		}
	}
	return dists[goal];
}

function edgeFocusedPFS(source, goal, threshold, data, asphaltOnly) {
	//first make the substrates
	var shortestD = starterPFS(source, goal, data, asphaltOnly);
	var maxDist = shortestD + threshold;

	var edgesNodes = createEdgeNodeLists(data, asphaltOnly);
	var edges = edgesNodes[0];
	var edgeListByNodes = listEdgesOfNodes(edgesNodes);

	//now the graph traversal
	//traverse one edge only once, but nodes maybe multiple times. Stop if distance is longer than maxDist
	var nodes = Object.keys(edgeListByNodes);
	var dists = {};
	//var closedEdges = {};
	var prioQ = {};
	var parentEdges = {};
	var nodesDeployed = {};

	//filling up the dicts
	for (var node of nodes) {
		dists[node] = Number.POSITIVE_INFINITY;
		parentEdges[node] = {};
		nodesDeployed[node] = false;
	}
	//I may not need this closedEdge thing but lets leave it here now
	/*for (edge in edges) {
	 closedEdges[edge] = false;
	 }*/

	//initialize for start node and put its edges into the queue
	dists[source] = 0;
	parentEdges[source] = {"stop": 0};
	nodesDeployed[source] = true;

	for (edge in edgeListByNodes[source]) {
		if (edgeListByNodes[source][edge] <= maxDist) {
			prioQ[edge] = edgeListByNodes[source][edge];
		}
	}

	while (Object.keys(prioQ).length > 0) {
		var currentEdge;

		//getting the current edge (lowest priority)
		var values = Object.values(prioQ);
		var minValue = Math.min.apply(Math, values);
		for (var key in prioQ) {
			if (prioQ[key] === minValue) {
				currentEdge = key;
				delete prioQ[key];
				break;
			}
		}

		var currentWeight = edges[currentEdge].weight;
		var startNode = currentEdge.substring(0, 3);
		var endNode = currentEdge.substring(4, 7);

		//HOOK: much better path found for endNode										   
		if (dists[endNode] >= dists[startNode] + currentWeight + threshold) {
			dists[endNode] = dists[startNode] + currentWeight;
			parentEdges[endNode] = {};
			parentEdges[endNode][currentEdge] = currentWeight;
		}

		//HOOK: better path found for endNode
		else if (dists[endNode] > dists[startNode] + currentWeight) {
			dists[endNode] = dists[startNode] + currentWeight;
			parentEdges[endNode][currentEdge] = currentWeight;
		}

		//HOOK: inRange path found for endNode
		else if (dists[endNode] + threshold >= dists[startNode] + currentWeight) {
			parentEdges[endNode][currentEdge] = currentWeight;
		}

		//if path is good to continue, next edges are deployed into the prioQ

		if (nodesDeployed[endNode] === false) {
			nodesDeployed[endNode] = true;
			var outEdges = edgeListByNodes[endNode];
			for (var edge in outEdges) {
				prioQ[edge] = outEdges[edge];
			}
		}

	}
	return [parentEdges, dists[goal]];
}

