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
		//      	  1 		 G 		  G^-1 		  Gk 		k^-1 	   Gk^2 	 G^-1k^-2  
var levels =     [ 'lvl_1',   'lvl_2',  'lvl_3',    'lvl_4',   'lvl_5',   'lvl_6',   'lvl_7'];
var lvl_colors = ['#dfe59c', '#c9c9c9', '#8f8f8f', '#a6f7ae', '#65b3eb', '#f0bc8b', '#f5b3d3'];
var cnt = 0;
							//    M  ^   L     ^	T 	^   I   ^
var lvl_texts  = [  [ ['lvl-1', ['', '', 'L', '2', 'T', '', '', '']],
					  ['lvl-2', ['-', '', '', '', '', '', '', '']],
					  ['lvl-3', ['-', '', '', '', '', '', '', '']],
					  ['lvl-4', ['-', '', '', '', '', '', '', '']],
					  ['lvl-5', ['-', '', '', '', '', '', '', '']],
					  ['Емкость', ['M', '-1', 'L', '-2', 'T', '4', 'I', '2']],
					  ['lvl-7', ['-', '', '', '', '', '', '', '']] 		// поля для 1 соты
				    ],
				    [ ['Объём, V', ['', '', 'L', '3', '', '', '', '']],
					  ['lvl-2', ['-', '', '', '', '', '', '', '']],
					  ['lvl-3', ['-', '', '', '', '', '', '', '']],
					  ['lvl-4', ['-', '', '', '', '', '', '', '']],
					  ['lvl-5', ['-', '', '', '', '', '', '', '']],
					  ['γ', ['M', '-1', 'L', '-1', 'T', '3', 'I', '2']],
					  ['lvl-7', ['-', '', '', '', '', '', '', '']]	    // поля для 2 соты
					],
				    []] 

function changeLevels(hex, increment) {
	var inside = hex.querySelector(".inside");
	var leftTriangle = hex.querySelector(".hexagon_triangle_left");
	var rightTriangle = hex.querySelector(".hexagon_triangle_right");

	lvl = levels[cnt];
	clr = lvl_colors[cnt];

	//_______________ И з м е н е н и е   Ц В Е Т А _________________//

	inside.style.background = clr;
	leftTriangle.style.borderRightColor = clr;
	leftTriangle.borderLeftWidth =  0;
	leftTriangle.borderTopColor = "transparent";
	leftTriangle.borderBottomColor = "transparent";

	rightTriangle.style.borderLeftColor = clr;
	rightTriangle.borderRightWidth =  0;
	rightTriangle.borderTopColor = "transparent";
	rightTriangle.borderBottomColor = "transparent";

	//______________________________________________________________//

	hex_id = hex.id;
	changeText(hex_id, cnt);

	if (increment) { cnt++; }
	else { cnt--; }
	if (cnt == lvl_colors.length) cnt = 0;
	if (cnt == -1) cnt = lvl_colors.length - 1;
}

//_______________ И з м е н е н и е   Т Е К С Т А _________________//

function changeText(hex_id, cnt) {

	let hex_name = hex_id + '-txt-name';
	let hex_frml = hex_id + '-txt-frml';

	let name = document.getElementById(hex_name);
	let elements = 	document.getElementById(hex_frml);

	let hex_number = hex_id.slice(4, hex_id.length) - 1; //номер соты в массиве
	hex_date = lvl_texts[hex_number];
	hex_date_name = hex_date[cnt][0];
	hex_date_frml = hex_date[cnt][1];


	name.innerText = hex_date_name;

	elements.childNodes[0].innerText = hex_date_frml[0];
	elements.childNodes[1].innerText = hex_date_frml[1];
	elements.childNodes[2].innerText = hex_date_frml[2];
	elements.childNodes[3].innerText = hex_date_frml[3];
	elements.childNodes[4].innerText = hex_date_frml[4];
	elements.childNodes[5].innerText = hex_date_frml[5];
	elements.childNodes[6].innerText = hex_date_frml[6];
	elements.childNodes[7].innerText = hex_date_frml[7];

}
//______________________________________________________________//



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

