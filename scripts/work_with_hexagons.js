class hexagon {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

hexagonElements = document.querySelectorAll(".one-hexagon");
clickedHexagons = [];

for (hex of hexagonElements) {
	hex.addEventListener("click", function() {
		this.style.opacity = 0.7;
		//remember all the data of the clicked element

		alert(this.querySelector(".inside").querySelector(".name").textContent);
		alert(this.querySelector(".inside").querySelector(".MLT").dataset.M)
		// var newHex = new hexagon("alala");
		// alert(newHex.name)
	})
}