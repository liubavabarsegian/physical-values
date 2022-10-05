class hexagon {
    constructor(name, level, coordinateX, coordinateY) {
        this.name = name;
		this.level = level;
		this.x = coordinateX;
		this.y = coordinateY;
    }
	// constructor() {}
	setName(name) {
		this.name = name;
	}
	setLevel(level) {
		this.level = level;
	}
	setX(coordinateX) {
		this.x = coordinateX;
	}
	setY(coordinateY) {
		this.y = coordinateY;
	}
    getName() {
        return this.name;
    }
	getLevel() {
		return this.level;
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
}

//colours for hover
yellowLight = "rgb(223, 223, 145)";
yellowDark = "rgb(196, 196, 95)";
grayLight = "rgb(184, 189, 194)";
grayDark = "rgb(146, 148, 150)";
redLight = "rgb(232, 119, 119)";
redDark = "rgb(171, 59, 59)";

hexagonElements = document.querySelectorAll(".one-hexagon");
clickedHexagons = [];
clickedTwice = false;

levels = ['red', 'green', 'blue', 'orange', 'black']
formulas = ['1', '2', '3', '4', '5']

//function for color changing
function changeColor(hex, darkColor, lightColor) {
		var inside = hex.querySelector(".inside");
		var leftTriangle = hex.querySelector(".hexagon_triangle_left");
		var rightTriangle = hex.querySelector(".hexagon_triangle_right");

		if (inside.style.background == darkColor) {
			inside.style.background = lightColor;
			leftTriangle.style.borderRightColor = lightColor;
			leftTriangle.borderLeftWidth =  0;
			leftTriangle.borderTopColor = "transparent";
			leftTriangle.borderBottomColor = "transparent";

			rightTriangle.style.borderLeftColor = lightColor;
			rightTriangle.borderRightWidth =  0;
			rightTriangle.borderTopColor = "transparent";
			rightTriangle.borderBottomColor = "transparent";
		} else {
			clickedTwice = true;
			inside.style.background = darkColor;

			leftTriangle.style.borderRightColor = darkColor;
			leftTriangle.borderLeftWidth =  0;
			leftTriangle.borderTopColor = "transparent";
			leftTriangle.borderBottomColor = "transparent";

			rightTriangle.style.borderLeftColor = darkColor;
			rightTriangle.borderRightWidth =  0;
			rightTriangle.borderTopColor = "transparent";
			rightTriangle.borderBottomColor = "transparent";
		}
}

function rememberHexagon(hex) {
	var position = hex.getBoundingClientRect();
	if (clickedHexagons.length < 3) {
		newHex = new hexagon("name", hex.dataset.level, position.left, position.right)
		clickedHexagons.push(newHex);
	}
	else {
		//drawParallelogram();
	}
}

for (hex of hexagonElements) {
	hex.addEventListener("click", function() {
		//change color
		if (this.dataset.level == "yellow") {
			changeColor(this, yellowDark, yellowLight);
		}
		if (this.dataset.level == "gray") {
			changeColor(this, grayDark, grayLight);
		}
		//remember all the data of the clicked element
		if (!clickedTwice) {
			rememberHexagon(this);
		}
		clickedTwice = false;
		
		
	})
	// var cnt = 0
	// hex.addEventListener("oncontextmenu", function() {
	// 	alert('CHeck')
	// 	this.style.color = levels[cnt];
	// 	// this.style.
	// 	// this.firstChild.nodeValue = "New Text";
	// 	cnt++;
	// 	if (cnt == levels.length) cnt = 0;
	// })
}


//пока не рабоатет нифигашечки.
function drawParallelogram() {
	var canvas = document.body.querySelector("#my-canvas");
    var ctx = canvas.getContext('2d');
	for (var i = 0; i < 3; i++) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(clickedHexagons[i].x, clickedHexagons[i].y)
		ctx.moveTo(0, 0);
		ctx.lineTo(clickedHexagons[i + 1].x, clickedHexagons[i + 1].y);
		ctx.stroke();
	}
}