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

	var contentString = '<div>' + '<b>' + 'Harsas-see' + '</b>' + '<br/>' +
			'<img src="images/infowindow_images/Harsas1.JPG" alt="see" width=80px height=50px float=left/>' +
			'Ein See mit sehr schöner und ruhiger Umgebung.' + '<br/>' +
			'Es lohnt sich, um den See herumspazieren.' + '<br/>' +
			'Im Sommer kann man am Strand baden und ein Kiosk ist geöffnet.' + '</div>';
	harsasTo.addListener('click', function () {
		infowindow.open(map, harsasTo);
	});
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	var hodosiTo = new google.maps.Marker({
		position: {lat: 46.835998, lng: 16.306712},
		map: map,
		icon: natureImg,
		scale: 10
	});

	//all culture sights
	var szalafoSkanzen = new google.maps.Marker({
		position: {lat: 46.864797, lng: 16.339407},
		map: map,
		icon: cultureImg,
		scale: 10
	});

	var hatarorMuzeum = new google.maps.Marker({
		position: {lat: 46.895479, lng: 16.252393},
		map: map,
		icon: cultureImg,
		scale: 10
	});


	//all building sights
	var ketvolgyKilato = new google.maps.Marker({
		position: {lat: 46.877727, lng: 16.227967},
		map: map,
		icon: buildingImg,
		scale: 10
	});

	var arpadKoriTemplomOri = new google.maps.Marker({
		position: {lat: 46.848592, lng: 16.402095},
		map: map,
		icon: buildingImg,
		scale: 10
	});
	
	//all food or coffee sights
	var omamaOri = new google.maps.Marker({
		position: {lat: 46.839974, lng: 16.418967},
		map: map,
		icon: coffeeImg,
		scale: 10
	});
	
	var orfaluTeahaz = new google.maps.Marker({
		position: {lat: 46.882138, lng: 16.266699},
		map: map,
		icon: coffeeImg,
		scale: 10
	});
	
	

	//all restaurant sights
	var szalafoIzek = new google.maps.Marker({
		position: {lat: 46.871292, lng: 16.353610},
		map: map,
		icon: restaurantImg,
		scale: 10
	});	

	var apatHotel = new google.maps.Marker({
		position: {lat: 46.893763, lng: 16.261132},
		map: map,
		icon: restaurantImg,
		scale: 10
	});

	//check these coordinates!
	var hatarCsardaBajansenye = new google.maps.Marker({
		position: {lat: 46.821351, lng: 16.351761},
		map: map,
		icon: restaurantImg,
		scale: 10
	});

	


}


