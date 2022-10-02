import {hexagon} from "./HexClass.js"

hexagonElements = document.querySelectorAll(".one-hexagon");
clickedHexagons = [];

for (hex of hexagonElements) {
	hex.addEventListener("click", function(){
		this.style.opacity = 0.7;
		//remember all the data of the clicked element
		var newHex = new hexagon("alala");
	})
}