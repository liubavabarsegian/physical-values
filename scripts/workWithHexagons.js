clickedTwice = false;

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

document.addEventListener("click", event => {
	if (event.button !== 2) { menu.classList.remove("active"); }
}, false)

menu.addEventListener("click", event => {
		event.stopPropagation();
}, false);




function Activate(hex) {
	let inside = hex.querySelector(".inside");
	let leftTriangle = hex.querySelector(".triangleLeft");
	let rightTriangle = hex.querySelector(".triangleRight");
	inside.classList.add("active-hexagon")
	leftTriangle.classList.add("active-triangle")
	rightTriangle.classList.add("active-triangle")
}

function Deactivate(hex) {
	let inside = hex.querySelector(".inside");
	let leftTriangle = hex.querySelector(".triangleLeft");
	let rightTriangle = hex.querySelector(".triangleRight");
	inside.classList.remove("active-hexagon")
	leftTriangle.classList.remove("active-triangle")
	rightTriangle.classList.remove("active-triangle")
}



function rememberHexagon(hex) {
	var inside = hex.querySelector(".inside");
	var headerHeight = document.getElementById("my-canvas").getBoundingClientRect().top;
	var position = inside.getBoundingClientRect();
	xCenter = (position.left + position.right) / 2;
	yCenter = (position.top + position.bottom) / 2 - headerHeight;
	if (clickedHexagons.length < 3) {
		newHex = new hexagon("name", hex.dataset.level, xCenter, yCenter)
		clickedHexagons.push(newHex);
		console.log("cl1")
	}
	else {
		newHex = new hexagon("name", hex.dataset.level, xCenter, yCenter)
		clickedHexagons.push(newHex);
		drawParallelogram();
		console.log("cl2")
	}
}

clickedHexagons = [];
let c = document.getElementById("my-canvas");
let ctx = c.getContext("2d");
function drawParallelogram() {
	ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 5;
	ctx.moveTo(clickedHexagons[0].x, clickedHexagons[0].y)
	for (var i = 1; i < 4; i++) {
		ctx.lineTo(clickedHexagons[i].x, clickedHexagons[i].y);
	}
	ctx.lineTo(clickedHexagons[0].x, clickedHexagons[0].y);
	ctx.stroke();
	clickedHexagons = []

}

function showRedactFormWithParams(gk) {
	//document.getElementById("form").classList.remove("invisible")
	writeIntoInputFromObject(gk,"name","name")
	writeIntoInputFromObject(gk,"ed_izm","unit")
	writeIntoInputFromObject(gk,"usl_ob","symbol")
	writeIntoInputFromObject(gk,"ob_ed_izm","unit_full")
	writeIntoInputFromObject(gk,"M","M")
	writeIntoInputFromObject(gk,"L","L")
	writeIntoInputFromObject(gk,"T","T")
	writeIntoInputFromObject(gk,"I","I")
}

let ContextElement
addEventListener('contextmenu', (event) => {ContextElement = event});
let redactHexElement

document.getElementById("l1").onclick = function(){
	redactHexElement = getMainHexFromSiblings(ContextElement.target)
	gk = getHexData(redactHexElement)
	showRedactFormWithParams(gk)
	menu.style.top = `${10000}px`;
}

function finRedact() {
	gk = getHexData(redactHexElement)
	writeFromForm(gk)
}

function writeFromForm(gk)  {
	//document.getElementById("form").classList.add("invisible")
	writeIntoObjFromInput(gk,"name","name")
	writeIntoObjFromInput(gk,"ed_izm","unit")
	writeIntoObjFromInput(gk,"usl_ob","symbol")
	writeIntoObjFromInput(gk,"ob_ed_izm","unit_full")
	writeIntoObjFromInput(gk,"M","M")
	writeIntoObjFromInput(gk,"L","L")
	writeIntoObjFromInput(gk,"T","T")
	writeIntoObjFromInput(gk,"I","I")
	createTable("newf",data)
	console.log(gk)
	console.log(getMLT(gk))
}

document.getElementById("l2").onclick = function(){
	redactHexElement = getMainHexFromSiblings(ContextElement.target)
	gk = getHexData(redactHexElement)
	deleteHexGK(gk)
	menu.style.top = `${10000}px`;
}

function deleteHexGK(gk) {
	console.log(gk)
	gk.name = ""
	gk.usl_ob = ""
	gk.M = 0
	gk.L = 0
	gk.T = 0
	gk.I = 0
	gk.ob_ed_izm = ""
	gk.ed_izm = ""
	console.log(gk)
	createTable("newf",data)

}

// curGK = getHexData(this)
// writeIntoObjFromInput(curGK,"name","name")
// writeIntoObjFromInput(curGK,"ed_izm","unit")
// writeIntoObjFromInput(curGK,"ob_ed_izm","unit_full")
// writeIntoObjFromInput(curGK,"M","M")
// writeIntoObjFromInput(curGK,"L","L")
// writeIntoObjFromInput(curGK,"T","T")
// writeIntoObjFromInput(curGK,"I","I")
// console.log(curGK)
// createTable("newf",data)
// redactionState = false
