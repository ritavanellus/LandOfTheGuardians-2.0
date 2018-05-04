/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function createAllPlaceMarkers() {
	var natureImg = {
		url: 'images/mapIcons/icon_nature.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(5, 30),
		scaledSize: new google.maps.Size(20, 20)
	};

	var buildingImg = {
		url: 'images/mapIcons/icon_building.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(5, 30),
		scaledSize: new google.maps.Size(20, 20)
	};

	var cultureImg = {
		url: 'images/mapIcons/icon_culture.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(5, 30),
		scaledSize: new google.maps.Size(20, 20)
	};

	var restaurantImg = {
		url: 'images/mapIcons/icon_restaurant.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(5, 30),
		scaledSize: new google.maps.Size(20, 20)
	};

	var foodImg = {
		url: 'images/mapIcons/icon_food.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(5, 30),
		scaledSize: new google.maps.Size(20, 20)
	};

	var coffeeImg = {
		url: 'images/mapIcons/icon_coffee.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(5, 30),
		scaledSize: new google.maps.Size(20, 20)
	};

	//all nature sights
	var harsasTo = new google.maps.Marker({
		position: {lat: 46.93386, lng: 16.31304},
		map: map,
		icon: natureImg,
		scale: 10
	});

	var con_harsasTo = '<div>' + '<b>' + 'Harsas-see' + '</b>' + '<p>' +
			'<img src="images/infowindow_images/Harsas1.JPG" alt="see" width=80px height=50px style="float: left; margin-right: 5px;"/>' +
			'Ein See mit sehr schöner und ruhiger Umgebung, wo man spazieren, angeln und im Sommer auch baden kann.\n\
			Für den Sommersaison ist auch ein Kiosk geöffnet.' + '</p></div>';
	harsasTo.addListener('click', function () {
		info_harsasTo.open(map, harsasTo);
	});
	var info_harsasTo = new google.maps.InfoWindow({
		content: con_harsasTo
	});

	var hodosiTo = new google.maps.Marker({
		position: {lat: 46.835998, lng: 16.306712},
		map: map,
		icon: natureImg,
		scale: 10
	});
	var con_hodosiTo = '<div>' + '<b>' + 'Hodos-see' + '</b>' + '<p>' +
			'Schöner See wo man angeln und im Sommer auch baden kann. \n\
			Für den Sommersaison ist auch ein Kiosk geöffnet.' + '</p></div>';
	hodosiTo.addListener('click', function () {
		info_hodosiTo.open(map, hodosiTo);
	});
	var info_hodosiTo = new google.maps.InfoWindow({
		content: con_hodosiTo
	});

	//all culture sights
	var szalafoSkanzen = new google.maps.Marker({
		position: {lat: 46.864797, lng: 16.339407},
		map: map,
		icon: cultureImg,
		scale: 10
	});
	var con_szalaSkanzen = '<div>' + '<b>' + 'Szalafo, Freilichtmuseum' + '</b>' + '</div>';
	szalafoSkanzen.addListener('click', function () {
		info_szalaSkanzen.open(map, szalafoSkanzen);
	});
	var info_szalaSkanzen = new google.maps.InfoWindow({
		content: con_szalaSkanzen
	});

	var hatarorMuzeum = new google.maps.Marker({
		position: {lat: 46.895479, lng: 16.252393},
		map: map,
		icon: cultureImg,
		scale: 10
	});
	var con_hatarorMu = '<div>' + '<b>' + 'Grenzschutzmuseum' + '</b>' + '</div>';
	hatarorMuzeum.addListener('click', function () {
		info_hatarorMu.open(map, hatarorMuzeum);
	});
	var info_hatarorMu = new google.maps.InfoWindow({
		content: con_hatarorMu
	});


	//all building sights
	var ketvolgyKilato = new google.maps.Marker({
		position: {lat: 46.877727, lng: 16.227967},
		map: map,
		icon: buildingImg,
		scale: 10
	});
	var con_kvKilato = '<div>' + '<b>' + 'Ketvolgy, Aussichtsturm' + '</b></div>';
	ketvolgyKilato.addListener('click', function () {
		info_kvKilato.open(map, ketvolgyKilato);
	});
	var info_kvKilato = new google.maps.InfoWindow({
		content: con_kvKilato
	});

	var arpadKoriTemplomOri = new google.maps.Marker({
		position: {lat: 46.848592, lng: 16.402095},
		map: map,
		icon: buildingImg,
		scale: 10
	});
	var con_arpadOri = '<div>' + '<b>' + 'Kirche vom 14ten Jahnrhundert' + '</b></div>';
	arpadKoriTemplomOri.addListener('click', function () {
		info_arpadOri.open(map, arpadKoriTemplomOri);
	});
	var info_arpadOri = new google.maps.InfoWindow({
		content: con_arpadOri
	});

	//all food or coffee sights
	var omamaOri = new google.maps.Marker({
		position: {lat: 46.839974, lng: 16.418967},
		map: map,
		icon: coffeeImg,
		scale: 10
	});
	var con_omama = '<div>' + '<b>' + 'Oma\'s Cafe' + '</b></div>';
	omamaOri.addListener('click', function () {
		info_omama.open(map, omamaOri);
	});
	var info_omama = new google.maps.InfoWindow({
		content: con_omama
	});

	var orfaluTeahaz = new google.maps.Marker({
		position: {lat: 46.882138, lng: 16.266699},
		map: map,
		icon: coffeeImg,
		scale: 10
	});
	var con_orfTea = '<div>' + '<b>' + 'Orfalu, Teehaus' + '</b></div>';
	orfaluTeahaz.addListener('click', function () {
		info_orfTea.open(map, orfaluTeahaz);
	});
	var info_orfTea = new google.maps.InfoWindow({
		content: con_orfTea
	});



	//all restaurant sights
	var szalafoIzek = new google.maps.Marker({
		position: {lat: 46.871292, lng: 16.353610},
		map: map,
		icon: restaurantImg,
		scale: 10
	});
	var con_szalaIzek = '<div>' + '<b>' + 'Szalafo, Porta des heimischen Geschmäcke' + '</b></div>';
	szalafoIzek.addListener('click', function () {
		info_szalaIzek.open(map, szalafoIzek);
	});
	var info_szalaIzek = new google.maps.InfoWindow({
		content: con_szalaIzek
	});

	var apatHotel = new google.maps.Marker({
		position: {lat: 46.893763, lng: 16.261132},
		map: map,
		icon: restaurantImg,
		scale: 10
	});
	var con_apat = '<div>' + '<b>' + 'Apat Hotel und Restaurant' + '</b></div>';
	apatHotel.addListener('click', function () {
		info_apat.open(map, apatHotel);
	});
	var info_apat = new google.maps.InfoWindow({
		content: con_apat
	});

	//check these coordinates!
	var hatarCsardaBajansenye = new google.maps.Marker({
		position: {lat: 46.821351, lng: 16.351761},
		map: map,
		icon: restaurantImg,
		scale: 10
	});
	var con_hatarCs = '<div>' + '<b>' + 'Grenz-Tscharda' + '</b></div>';
	hatarCsardaBajansenye.addListener('click', function () {
		info_hatarCs.open(map, hatarCsardaBajansenye);
	});
	var info_hatarCs = new google.maps.InfoWindow({
		content: con_hatarCs
	});




}


