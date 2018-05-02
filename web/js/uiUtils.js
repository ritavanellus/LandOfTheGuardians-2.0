/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function setSelected(nodeID) {

	if (nodeID === startID) {
		alert("Kann nicht das Startpunkt als Zielpunkt auswahlen");
		return;
	}

	var nodeSelectedImg = {
		url: 'images/mapIcons/icon_nodeSelected.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(7, 10),
		scaledSize: new google.maps.Size(20, 20)
	};
	var nodeImg = {
		url: 'images/mapIcons/icon_nodeNormal.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(7, 10),
		scaledSize: new google.maps.Size(20, 20)
	};

	if (selectedID !== "") {
		allWayPoints[selectedID].setIcon(nodeImg);
	}
	selectedID = nodeID;
	allWayPoints[selectedID].setIcon(nodeSelectedImg);
	document.getElementById("alternatives").style.display = "none";
}

function setAsStart() {
	var nodeStartImg = {
		url: 'images/mapIcons/icon_nodeStart.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(7, 10),
		scaledSize: new google.maps.Size(20, 20)
	};
	var nodeImg = {
		url: 'images/mapIcons/icon_nodeNormal.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(7, 10),
		scaledSize: new google.maps.Size(20, 20)
	};
	if (selectedID === "") {
		alert("Bitte zuerst einen Punkt auf der Karte wählen!");
		return;
	} else {
		if (startID !== "") {
			allWayPoints[startID].setIcon(nodeImg);
		}
		startID = selectedID;
		selectedID = "";
		allWayPoints[startID].setIcon(nodeStartImg);
	}
}

function findAndShowRoute() {
	$.getJSON("jsons/test_All_smooth5.json", function (jsonData) {
		document.getElementById("alternatives").style.display = "none";
		if (startID === "" || selectedID === "") {
			alert("Für die Wegberechnung, bitte wählen Sie zwei Punkte auf die Karte aus!");
			return;
		}

		routeAddEnabled = true;
		//cleaning previous data out
		multipleWays = [];
		actRouteIndex = 0;
		actualRoute = {};
		routeToShow = [];

		if (routeBildActive) {
			if (document.getElementById("whichRoute").infoSelector.value === "actual") {
				showTotalActive = false;
			} else {
				showTotalActive = true;
			}
		}

		var BFways = findAllShortWays(startID, selectedID, jsonData, false);
		if (BFways.length === 0) {
			alert("something sucks, need to debug");
			return;
		}

		if (BFways.length === 1) {
			actualRoute = BFways[0];

			//Hook: if total path needs to be shown, it needs to be added to routeToShow here.
			if (routeBildActive && showTotalActive && totalRoute.length > 0) {
				//reminder: 3rd argument is isTotal - color and storage array are different in case of total path
				showTrace(totalRoute, jsonData, true);
				showTrace(actualRoute.path, jsonData, false);
				rtsWithTotal = true;

				for (var totalsEdge of totalRoute) {
					routeToShow.push(totalsEdge);
				}
				for (var edge of actualRoute.path) {
					routeToShow.push(edge);
				}
			} else {
				routeToShow = actualRoute.path;
				hideTrace(true);
				showTrace(routeToShow, jsonData, false);
				rtsWithTotal = false;
			}

			var chartData = sumDataForChart(routeToShow, jsonData);
			plotChart(routeToShow, chartData, jsonData);
			updateControlPanel(routeToShow, jsonData);

		} else {
			multipleWays = BFways;
			document.getElementById("alternatives").style.display = "inline";
			document.getElementById("altActualPerTotal").innerHTML = "Route " + (actRouteIndex + 1) + "/" +
					BFways.length + " ist angezeigt";
			actualRoute = BFways[actRouteIndex];

			//Hook: if total path needs to be shown, it needs to be added to routeToShow here.
			if (routeBildActive && showTotalActive && totalRoute.length > 0) {
				showTrace(totalRoute, jsonData, true);
				showTrace(actualRoute.path, jsonData, false);
				rtsWithTotal = true;

				for (var totalsEdge of totalRoute) {
					routeToShow.push(totalsEdge);
				}
				for (var edge of actualRoute.path) {
					routeToShow.push(edge);
				}
			} else {
				routeToShow = actualRoute.path;
				hideTrace(true);
				showTrace(routeToShow, jsonData, false);
				rtsWithTotal = false;
			}

			var chartData = sumDataForChart(routeToShow, jsonData);
			plotChart(routeToShow, chartData, jsonData);
			updateControlPanel(routeToShow, jsonData);

			if (BFways.length > 10) {
				alert("Sehr viele Routenoptionen wurden gefunden. Um wenigere Ergebnisse zu bekommen, \n\
können Sie den Schwellenwert senken, oder zuerst ein Zwischenpunkt bevor dem derzeitigen Zielpunkt eingeben");
			}
		}
	});
}

function showPrevRoute() {
	$.getJSON("jsons/test_All_smooth5.json", function (jsonData) {
		actRouteIndex--;
		actualRoute = {};
		routeToShow = [];

		if (routeBildActive) {
			if (document.getElementById("whichRoute").infoSelector.value === "actual") {
				showTotalActive = false;
			} else {
				showTotalActive = true;
			}
		}

		var numOfRoutes = multipleWays.length;
		//here modulo can be a negative number
		var modulo = actRouteIndex % numOfRoutes;
		var realIndex;
		if (modulo < 0) {
			realIndex = numOfRoutes + modulo;

		} else {
			realIndex = 0 + modulo;
		}
		actualRoute = multipleWays[realIndex];

		//Hook: if total path needs to be shown, it needs to be added to routeToShow here.
		if (routeBildActive && showTotalActive && totalRoute.length > 0) {
			showTrace(totalRoute, jsonData, true);
			showTrace(actualRoute.path, jsonData, false);
			rtsWithTotal = true;
			for (var totalsEdge of totalRoute) {
				routeToShow.push(totalsEdge);
			}
			for (var edge of actualRoute.path) {
				routeToShow.push(edge);
			}
		} else {
			routeToShow = actualRoute.path;
			showTrace(routeToShow, jsonData, false);
			rtsWithTotal = false;
		}
		var chartData = sumDataForChart(routeToShow, jsonData);
		plotChart(routeToShow, chartData, jsonData);
		updateControlPanel(routeToShow, jsonData);
		document.getElementById("altActualPerTotal").innerHTML = "Route " + (realIndex + 1) + "/" +
				numOfRoutes + " ist angezeigt";
	});
}

function showNextRoute() {
	if (startID === selectedID) {
		alert("Startpunkt und Zielpunkt können nicht das gleiche sein! Bitte ein anderes Zielpunkt wählen!");
		return;
	}

	$.getJSON("jsons/test_All_smooth5.json", function (jsonData) {
		actRouteIndex++;
		actualRoute = {};
		routeToShow = [];

		if (routeBildActive) {
			if (document.getElementById("whichRoute").infoSelector.value === "actual") {
				showTotalActive = false;
			} else {
				showTotalActive = true;
			}
		}

		var numOfRoutes = multipleWays.length;
		//here modulo will be a negative number
		var modulo = actRouteIndex % numOfRoutes;
		var realIndex;
		if (modulo < 0) {
			realIndex = numOfRoutes + modulo;

		} else {
			realIndex = 0 + modulo;
		}
		actualRoute = multipleWays[realIndex];

		//Hook: if total path needs to be shown, it needs to be added to routeToShow here.
		if (routeBildActive && showTotalActive && totalRoute.length > 0) {
			showTrace(totalRoute, jsonData, true);
			showTrace(actualRoute.path, jsonData, false);
			rtsWithTotal = true;
			for (var totalsEdge of totalRoute) {
				routeToShow.push(totalsEdge);
			}
			for (var edge of actualRoute.path) {
				routeToShow.push(edge);
			}
		} else {
			routeToShow = actualRoute.path;
			showTrace(routeToShow, jsonData, false);
			rtsWithTotal = false;
		}

		var chartData = sumDataForChart(routeToShow, jsonData);
		plotChart(routeToShow, chartData, jsonData);
		updateControlPanel(routeToShow, jsonData);
		document.getElementById("altActualPerTotal").innerHTML = "Route " + (realIndex + 1) + "/" +
				numOfRoutes + " ist angezeigt";
	});
}

function addToTotalRoute() {

	if (!routeAddEnabled) {
		alert("Die Zugabe dieser Route ist nicht möglich. Bitte zuerst eine neue Route berechnen lassen!");
		return;
	}

	if (startID === "" || selectedID === "") {
		alert("Noch keine Route wurde berechnet. Bitte zuerst eine Route berechnen lassen!");
		return;
	}

	if (startID === selectedID) {
		alert("Startpunkt und Zielpunkt kann nicht das gleiche sein! Bitte ein anderes Zielpunkt wählen!");
		return;
	}

	if (routeToShow === []) {
		alert("Keine Route ist verfügbar!");
		return;
	}

	if (document.getElementById("whichRoute").infoSelector.value === "actual") {
		showTotalActive = false;
	} else {
		showTotalActive = true;
	}

	if (rtsWithTotal) {
		totalRoute = [];
	}
	for (var edge of routeToShow) {
		totalRoute.push(edge);
	}

	routeToShow = [];
	actualRoute = {};

	deleteTrace(false);

	$.getJSON("jsons/test_All_smooth5.json", function (jsonData) {
		showTrace(totalRoute, jsonData, true);

		if (showTotalActive) {
			showTrace(totalRoute, jsonData, true);
			for (var totalsEdge of totalRoute) {
				routeToShow.push(totalsEdge);
			}
		}

		var chartData = sumDataForChart(routeToShow, jsonData);
		plotChart(routeToShow, chartData, jsonData);
		updateControlPanel(routeToShow, jsonData);
	});

	//and change the icons
	var nodeStartImg = {
		url: 'images/mapIcons/icon_nodeStart.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(7, 10),
		scaledSize: new google.maps.Size(20, 20)
	};
	var nodeImg = {
		url: 'images/mapIcons/icon_nodeNormal.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(7, 10),
		scaledSize: new google.maps.Size(20, 20)
	};

	allWayPoints[startID].setIcon(nodeImg);
	allWayPoints[selectedID].setIcon(nodeStartImg);

	startID = selectedID;
	selectedID = "";
	alert("Strecke zur Route erfolgreich zugegeben");

	document.getElementById("alternatives").style.display = "none";
	routeAddEnabled = false;
}

//TODO: get this out of the shit! Now not working correctly. 
function refreshDisplay() {
	if (startID === "" || selectedID === "" || totalRoute === []) {
		return;
	}

	if (document.getElementById("whichRoute").infoSelector.value === "actual") {
		showTotalActive = false;
	} else {
		showTotalActive = true;
	}

	$.getJSON("jsons/test_All_smooth5.json", function (jsonData) {
		routeToShow = [];
		//Hook: if total path needs to be shown, it needs to be added to routeToShow here.
		if (showTotalActive) {
			showTrace(totalRoute, jsonData, true);
			for (var totalsEdge of totalRoute) {
				routeToShow.push(totalsEdge);
			}
			if (actualRoute.path !== undefined) {
				showTrace(actualRoute.path, jsonData, false);
				for (var edge of actualRoute.path) {
					routeToShow.push(edge);
				}
			}
		} else if (actualRoute.path !== undefined) {
			hideTrace(true);
			for (var edge of actualRoute.path) {
					routeToShow.push(edge);
				}
			showTrace(routeToShow, jsonData, false);
		} else {
			routeToShow = [];
			hideTrace(true);
		}

		var chartData = sumDataForChart(routeToShow, jsonData);
		plotChart(routeToShow, chartData, jsonData);
		updateControlPanel(routeToShow, jsonData);
	});
}

function deleteUntilThis() {

	if (selectedID === startID) {
		alert("Startpunkt und neues Startpunkt kann nicht das gleiche sein!");
	}

	hideTrace(true);
	deleteTrace(false);

	var posOfSelected = -1;
	for (var i = totalRoute.length - 1; i >= 0; i--) {
		var edge = totalRoute[i];
		var edgeStart = edge.substring(0, 3);
		if (edgeStart === selectedID) {
			posOfSelected = i;
			break;
		}
	}

	if (posOfSelected === -1) {
		alert("Das ausgewählte Punkt liegt nicht auf der Route, deshalb kann nichts gelöscht werden");
		return;
	} else {
		totalRoute.splice(posOfSelected);
	}

	//display needs to be updated too
	$.getJSON("jsons/test_All_smooth5.json", function (jsonData) {
		routeToShow = [];
		if (showTotalActive) {
			showTrace(totalRoute, jsonData, true);
			for (var totalsEdge of totalRoute) {
				routeToShow.push(totalsEdge);
			}
		} else {
			routeToShow = [];
		}

		var chartData = sumDataForChart(routeToShow, jsonData);
		plotChart(routeToShow, chartData, jsonData);
		updateControlPanel(routeToShow, jsonData);
	});

	//icons need to be changed, too. selectedID should be startID, selectedID should be emptied at the end
	var nodeStartImg = {
		url: 'images/mapIcons/icon_nodeStart.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(7, 10),
		scaledSize: new google.maps.Size(20, 20)
	};
	var nodeImg = {
		url: 'images/mapIcons/icon_nodeNormal.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(7, 10),
		scaledSize: new google.maps.Size(20, 20)
	};

	allWayPoints[startID].setIcon(nodeImg);
	allWayPoints[selectedID].setIcon(nodeStartImg);
	startID = selectedID;
	selectedID = "";
}

function resetRouteBuild() {
	var nodeImg = {
		url: 'images/mapIcons/icon_nodeNormal.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(7, 10),
		scaledSize: new google.maps.Size(20, 20)
	};

	if (startID !== "") {
		allWayPoints[startID].setIcon(nodeImg);
	}
	if (selectedID !== "") {
		allWayPoints[selectedID].setIcon(nodeImg);
	}

	deleteTrace(true);
	deleteTrace(false);

	startID = "";
	selectedID = "";
	multipleWays = [];
	actRouteIndex = 0;
	actualRoute = {}; //this is a route object with edges[] and dist value
	routeToShow = []; //this is the edge array given to the panel/chart etc functions
	totalRoute = [];

	resetControlPanel();
	document.getElementById("chart").innerHTML = "";
	document.getElementById("alternatives").style.display = "none";
	routeAddEnabled = false;
}


function showTrace(edgeArray, data, isTotal) {

	var routeColor = 'DD00DD';
	var strokeWeight = 4;
	var turnEdges = {};
	var section;

	if (isTotal) {
		routeColor = '#DD00DD';
		while (activeTotalPolyline.length > 0) {
			section = activeTotalPolyline.pop();
			section.setMap(null);
		}
	} else {
		routeColor = '#0000FF';
		while (activePolyLine.length > 0) {
			section = activePolyLine.pop();
			section.setMap(null);
		}
	}

	for (var newSection of edgeArray) {
		//get the reverse edge and put both into the turnEdges object
		if (isTotal) {
			if (turnEdges[newSection] !== undefined) {
				strokeWeight = 8;
			} else {
				strokeWeight = 4;
				var rev = newSection.substring(4, 8) + newSection.substring(0, 4) + newSection.substring(8);
				turnEdges[newSection] = true;
				turnEdges[rev] = true;
			}
		}

		var traceK = data[newSection].polyLine;
		var thisSection = new google.maps.Polyline({
			path: traceK,
			geodesic: true,
			strokeColor: routeColor,
			strokeOpacity: 1.0,
			strokeWeight: strokeWeight
		});

		thisSection.setMap(map);
		isTotal ? activeTotalPolyline.push(thisSection) : activePolyLine.push(thisSection);
	}
}

//a function that deletes polylines and depletes the input array
function deleteTrace(isTotal) {
	var section;

	if (isTotal) {
		while (activeTotalPolyline.length > 0) {
			section = activeTotalPolyline.pop();
			section.setMap(null);
		}
	} else {
		while (activePolyLine.length > 0) {
			section = activePolyLine.pop();
			section.setMap(null);
		}
	}

}

//a function that deletes polylines but does not deplete the input array
function hideTrace(isTotal) {
	var section;
	if (isTotal) {
		for (section of activeTotalPolyline) {
			section.setMap(null);
		}

	} else {
		for (section of activePolyline) {
			section.setMap(null);
		}
	}
}




