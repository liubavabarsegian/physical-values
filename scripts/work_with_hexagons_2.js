// class hexagon {
//     constructor(name, level, coordinateX, coordinateY) {
//         this.name = name;
// 		this.level = level;
// 		this.x = coordinateX;
// 		this.y = coordinateY;
//     }
// 	// constructor() {}
// 	setName(name) {
// 		this.name = name;
// 	}
// 	setLevel(level) {
// 		this.level = level;
// 	}
// 	setX(coordinateX) {
// 		this.x = coordinateX;
// 	}
// 	setY(coordinateY) {
// 		this.y = coordinateY;
// 	}
//     getName() {
//         return this.name;
//     }
// 	getLevel() {
// 		return this.level;
// 	}
// 	getX() {
// 		return this.x;
// 	}
// 	getY() {
// 		return this.y;
// 	}
// }

// //colours for hover
// yellowLight = "rgb(223, 223, 145)";
// yellowDark = "rgb(196, 196, 95)";
// grayLight = "rgb(184, 189, 194)";
// grayDark = "rgb(146, 148, 150)";
// redLight = "rgb(232, 119, 119)";
// redDark = "rgb(171, 59, 59)";

// hexagonElements = document.querySelectorAll(".one-hexagon");
// clickedHexagons = [];
// clickedTwice = false;

// levels = ['red', 'green', 'blue', 'orange', 'black']
// formulas = ['1', '2', '3', '4', '5']

// // let func = () => {
// // 	alert("CHECK_FOO")
// // }
// // export default func


// //function for color changing

// function changeColor(hex, darkColor, lightColor) {
// 		var inside = hex.querySelector(".inside");
// 		var leftTriangle = hex.querySelector(".hexagon_triangle_left");
// 		var rightTriangle = hex.querySelector(".hexagon_triangle_right");

// 		if (inside.style.background == darkColor) {
// 			inside.style.background = lightColor;
// 			leftTriangle.style.borderRightColor = lightColor;
// 			leftTriangle.borderLeftWidth =  0;
// 			leftTriangle.borderTopColor = "transparent";
// 			leftTriangle.borderBottomColor = "transparent";

// 			rightTriangle.style.borderLeftColor = lightColor;
// 			rightTriangle.borderRightWidth =  0;
// 			rightTriangle.borderTopColor = "transparent";
// 			rightTriangle.borderBottomColor = "transparent";
// 		} else {
// 			clickedTwice = true;
// 			inside.style.background = darkColor;

// 			leftTriangle.style.borderRightColor = darkColor;
// 			leftTriangle.borderLeftWidth =  0;
// 			leftTriangle.borderTopColor = "transparent";
// 			leftTriangle.borderBottomColor = "transparent";

// 			rightTriangle.style.borderLeftColor = darkColor;
// 			rightTriangle.borderRightWidth =  0;
// 			rightTriangle.borderTopColor = "transparent";
// 			rightTriangle.borderBottomColor = "transparent";
// 		}
// }

// console.log(hexagonElements)

// for (hex of hexagonElements) {
// 	hex.addEventListener("click", function(e) { console.log('check') })
// 	hex.addEventListener("contextmenu", function(e) { console.log('check') })
// }


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



yellowLight = "rgb(223, 223, 145)";
yellowDark = "rgb(196, 196, 95)";
grayLight = "rgb(184, 189, 194)";
grayDark = "rgb(146, 148, 150)";
redLight = "rgb(232, 119, 119)";
redDark = "rgb(171, 59, 59)";


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

var levels = ['red', 'green', 'blue', 'orange', 'black'];
var cnt = 0;

function changeLevels(hex, increment) {
	var inside = hex.querySelector(".inside");
	var leftTriangle = hex.querySelector(".hexagon_triangle_left");
	var rightTriangle = hex.querySelector(".hexagon_triangle_right");

	clr = levels[cnt]

	inside.style.background = clr;
	leftTriangle.style.borderRightColor = clr;
	leftTriangle.borderLeftWidth =  0;
	leftTriangle.borderTopColor = "transparent";
	leftTriangle.borderBottomColor = "transparent";

	rightTriangle.style.borderLeftColor = clr;
	rightTriangle.borderRightWidth =  0;
	rightTriangle.borderTopColor = "transparent";
	rightTriangle.borderBottomColor = "transparent";

	if (increment) { cnt++; }
	else { cnt--; }
	if (cnt == levels.length) cnt = 0;
	if (cnt == -1) cnt = levels.length - 1;
}


const menuArea = document.querySelectorAll(".one-hexagon");
const menu = document.querySelector(".context-menu__items");

fl = true;
vsp = null;

for (hex of menuArea) {
	if (!fl) break;
	hex.addEventListener("contextmenu", function(event) {
		event.preventDefault();
		menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
		menu.classList.add("active");
		vsp = this;
	});

	hex.addEventListener("click", function() {
		if (this.dataset.level == "yellow") {
			changeColor(this, yellowDark, yellowLight);
		}
		if (this.dataset.level == "gray") {
			changeColor(this, grayDark, grayLight);
		}
	});

	document.addEventListener("click", event => {
		if (event.button !== 2) { menu.classList.remove("active"); }
	}, false)

	menu.addEventListener("click", event => {
    	event.stopPropagation();
    }, false);

	document.getElementById("l1").onclick = function(){
		changeLevels(vsp, true)
	}

	document.getElementById("l2").onclick = function(){
		changeLevels(vsp, false);
	}

}

