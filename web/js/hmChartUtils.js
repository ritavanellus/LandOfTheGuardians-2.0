/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function sumDataForChart(edgeArray, data) {
	var summedData = [];
	var incr = 0;
	for (var section of edgeArray) {
		var xyPairs = data[section].forChart;
		for (var i = 0; i < xyPairs.length; i++) {
			var object = xyPairs[i];
			object.x += incr;
			summedData.push(object);
			if (i === xyPairs.length - 1) {
				incr = xyPairs[i].x;
			}
		}
	}
	return summedData;
}



function createPlotlines(edgeArray, data) {
	var plotlines = [];
	var incr = 0;
	//create the starting one
	var starter = {
		color: '#000000',
		width: 2,
		value: 0,
		label: {
			text: data[edgeArray[0]].startPoint,
			verticalAlign: 'middle',
			textAlign: 'left',
			rotation: 270,
			y: 50,
			x: 12
		}
	};
	plotlines.push(starter);
	for (var section of edgeArray) {
		var actualEnd = {
			color: '#000000',
			width: 2,
			value: data[section].length + incr,
			label: {
				text: data[section].endPoint,
				verticalAlign: 'middle',
				textAlign: 'left',
				rotation: 270,
				y: 50,
				x: 12
			}
		};
		plotlines.push(actualEnd);
		incr += data[section].length;
	}
	return plotlines;
}

function plotChart (edgeArray, summedData, data) {

	var myChart = Highcharts.chart('chart', {

		chart: {
			type: "area",
			zoomType: 'x',
			panning: true,
			panKey: 'shift'
		},
		/*boost: {
			enabled: false ,
			useGPUTranslations: true
		},*/
		title: {
			text: data[edgeArray[0]].startPoint + " - " + data[edgeArray[edgeArray.length - 1]].endPoint
		},
		yAxis: {
			title: {
				text: 'Seehöhe (m)'
			},
			min: 100,
			max: null
		},
		xAxis: {
			title: {
				text: 'Distanz (km)'
			},
			plotLines: createPlotlines(edgeArray, data)
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				}
			}
		},
		series: [{
				/*boostThreshold: 500,*/
				/*turboThreshold: 50000,*/
				name: "summed Route",
				data: summedData,
				color: "rgb(0,72,81)",
				fillColor: null,
				fillopacity: 0.1
			}],

		responsive: {
			rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {

					}
				}]
		}
	});
}
