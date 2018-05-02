/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function setLanguage() {
	if (document.getElementById("language").value === "hungarian") {
		document.getElementById("languageLabel").innerHTML = "Nyelvvalasztas: ";
	} else {
		document.getElementById("languageLabel").innerHTML = "Sprachauswahl: ";
	}
}


