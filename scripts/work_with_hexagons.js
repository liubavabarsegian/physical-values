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

levels = ['red', 'green', 'blue', 'orange', 'black']
formulas = ['1', '2', '3', '4', '5']

for (hex of hexagonElements) {
	hex.addEventListener("click", function() {
		this.style.opacity = 0.6;
		this.style.border = 3;
		//remember all the data of the clicked element

		// alert(this.querySelector(".inside").querySelector(".name").textContent);
		// alert(this.querySelector(".inside").querySelector(".MLT").dataset.M)
		// var newHex = new hexagon("alala");
		// alert(newHex.name)
	})
	var cnt = 0
	hex.addEventListener("contextmenu", function() {
		this.style.color = levels[cnt];
		// this.style.
		// this.firstChild.nodeValue = "New Text";
		cnt++;
		if (cnt == levels.length) cnt = 0;
	})
}