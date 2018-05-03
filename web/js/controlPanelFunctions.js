/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function toggleRouteBuild() {
	if (document.getElementById("routeBuildTools").style.display === "none") {
		document.getElementById("routeBuildTools").style.display = "inline";
		document.getElementById("buildActive").innerHTML = "Routeaufbau ausschalten";
		routeBildActive = true;
	} else {
		document.getElementById("routeBuildTools").style.display = "none";
		document.getElementById("buildActive").innerHTML = "Routeaufbau einschalten";
		routeBildActive = false;
	}
}

function updateControlPanel(summedRoute, data) {
	document.getElementById("start").innerHTML = data[summedRoute[0]].startPoint;
	document.getElementById("end").innerHTML = data[summedRoute[summedRoute.length - 1]].endPoint;
	document.getElementById("length").innerHTML = giveSummedDist(summedRoute, data).toFixed(2) + " km";
	document.getElementById("asphaltLength").innerHTML = giveSummedAsphalt(summedRoute, data).toFixed(2) + " km";
	document.getElementById("anstieg").innerHTML = giveSummedEle(summedRoute, data).toFixed(2) + " m";
}

function resetControlPanel() {
	document.getElementById("start").innerHTML = "-";
	document.getElementById("end").innerHTML = "-";
	document.getElementById("length").innerHTML = "-";
	document.getElementById("asphaltLength").innerHTML = "-";
	document.getElementById("anstieg").innerHTML = "-";
}

function giveSummedDist(edgeArray, data) {
	var summedDist = 0;
	for (var edge of edgeArray) {
		summedDist += data[edge].length;
	}
	return summedDist;
}

function giveSummedAsphalt(edgeArray, data) {
	var summedAsp = 0;
	for (var edge of edgeArray) {
		if (data[edge].asphalt === true) {
			summedAsp += data[edge].length;
		}
	}
	return summedAsp;
}

function giveSummedEle(edgeArray, data) {
	var summedEle = 0;
	for (var edge of edgeArray) {
		summedEle += data[edge].elevation;
	}
	return summedEle;
}

function prepareAndSubmit() {
	if (totalRoute.length === 0) {
		alert("Noch keine Route aufgebaut");
	} else {
		var passedArray = [];
		for (var edge of totalRoute) {
			passedArray.push(edge);
		}
		document.getElementById("pathArray").value = passedArray;
		var form = document.getElementsById("kmlDownloader");
		form.submit();
	}
}