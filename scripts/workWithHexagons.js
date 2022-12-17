	var step = 0;
var resources = [JSON.stringify(data), JSON.stringify(data), JSON.stringify(data), JSON.stringify(data)];
function goBack() {
	console.log('goBack()');
	step = step + 1;
	if (step < resources.length) {
		data = JSON.parse(resources[step]);
		sortGK(data);
		createTable("newf", data);
		console.log(data);
	}
	else {alert('Отменить действия невозможно!') }
}

function ReplacingSteps(actualData) {
	//if (1 <= resources.length <= 4) {
	//	resources.push(data);
 //   }
	for (let i = resources.length - 1; i >= 1; i--) {
		console.log(JSON.parse(resources[i]), JSON.parse(resources[i - 1]));
		resources[i] = resources[i - 1];
	}
	resources[0] = JSON.stringify(actualData);
	step = 0;
	console.log(JSON.parse(resources[0]))
	console.log(resources);
}

//store = (function (prev) {
//	callee = arguments.callee;
//	return function (curr) {
//		console.log(prev);
//		console.log("prev:" + prev, "curr:" + curr);
//		store = callee(curr);
//	}
//}(data)) //Initial value

//store(1); //Output : prev:0 curr:1 
//store(2); //Output : prev:1 curr:2
//store(5); //Output : prev:2 curr:3
//console.log(prev);

//function goForward() {
//	console.log('goForward()')
//}

document.addEventListener("click", event => {
	if (event.button !== 2) { menu.classList.remove("active"); gkmenu.classList.remove("active")}
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

document.addEventListener("keydown", (event) => {
	if (event.keyCode == 27) {
		clickedHexagons.forEach(hexElement => Deactivate(hexElement));
		clickedHexagons = [];
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
})

drawingParallelogram = false
clickedHexagons = [];
function rememberHexagon(hex) {

	hexCoords = getHexCanvasCoords(hex)

	clickedHexagons.push(hex);
	
	console.log(clickedHexagons)
	drawingParallelogram = true
	//console.log(hex)
	if (clickedHexagons.length == 3) {
		tempclickedHexagons = [clickedHexagons[0], clickedHexagons[1], clickedHexagons[2], clickedHexagons[1]];
		if (checkParallelogram(tempclickedHexagons)) {
			clickedHexagonsCoords = tempclickedHexagons.map(hexagon => getHexCanvasCoords(hexagon));
			document.getElementById("lawOpen").click();
			hexDataLaw = tempclickedHexagons.map(hex => getHexData(hex));
			document.getElementById("lawConfig").innerHTML = `${hexDataLaw[0].name} * ${hexDataLaw[2].name} = (${hexDataLaw[1].name})^2`;
			document.getElementById("lawFormula").innerHTML = `${hexDataLaw[0].usl_ob} * ${hexDataLaw[2].usl_ob} = (${hexDataLaw[1].usl_ob})^2`;
			let keyArray = [`${hexDataLaw[0].M}${hexDataLaw[0].L}${hexDataLaw[0].T}${hexDataLaw[0].I}`, `${hexDataLaw[2].M}${hexDataLaw[2].L}${hexDataLaw[2].T}${hexDataLaw[2].I}`, `(${hexDataLaw[1].M}${hexDataLaw[1].L}${hexDataLaw[1].T}${hexDataLaw[1].I})^2`];
			//document.getElementById("lawMLTI").innerHTML = `${hexDataLaw[0].M}${hexDataLaw[0].L}${hexDataLaw[0].T}${hexDataLaw[0].I} * ${hexDataLaw[2].M}${hexDataLaw[2].L}${hexDataLaw[2].T}${hexDataLaw[2].I} = (${hexDataLaw[1].M}${hexDataLaw[1].L}${hexDataLaw[1].T}${hexDataLaw[1].I})^2`;
			document.getElementById("lawMLTI").innerHTML = keyArray.sort();
			drawParallelogram(clickedHexagonsCoords, "red");
			document.getElementById("lawName").value = "";
			document.getElementById("lawType").value = "";
			clickedHexagons.forEach(hexElement => Deactivate(hexElement))
			clickedHexagons = []
			drawingParallelogram = false
		}
	}
	if (clickedHexagons.length == 4) {
		if (checkParallelogram(clickedHexagons)) {
			clickedHexagonsCoords = clickedHexagons.map(hexagon => getHexCanvasCoords(hexagon));
			document.getElementById("lawOpen").click();
			hexDataLaw = clickedHexagons.map(hex => getHexData(hex));
			document.getElementById("lawConfig").innerHTML = `${hexDataLaw[0].name} * ${hexDataLaw[2].name} = ${hexDataLaw[1].name} * ${hexDataLaw[3].name}`;
			document.getElementById("lawFormula").innerHTML = `${hexDataLaw[0].usl_ob} * ${hexDataLaw[2].usl_ob} = ${hexDataLaw[1].usl_ob} * ${hexDataLaw[3].usl_ob}`;
			let keyArray = [`${hexDataLaw[0].M}${hexDataLaw[0].L}${hexDataLaw[0].T}${hexDataLaw[0].I}`, `${hexDataLaw[2].M}${hexDataLaw[2].L}${hexDataLaw[2].T}${hexDataLaw[2].I}`, `${hexDataLaw[1].M}${hexDataLaw[1].L}${hexDataLaw[1].T}${hexDataLaw[1].I}`, `${hexDataLaw[3].M}${hexDataLaw[3].L}${hexDataLaw[3].T}${hexDataLaw[3].I}`];
			//document.getElementById("lawMLTI").innerHTML = `${hexDataLaw[0].M}${hexDataLaw[0].L}${hexDataLaw[0].T}${hexDataLaw[0].I} * ${hexDataLaw[2].M}${hexDataLaw[2].L}${hexDataLaw[2].T}${hexDataLaw[2].I} = ${hexDataLaw[1].M}${hexDataLaw[1].L}${hexDataLaw[1].T}${hexDataLaw[1].I} * ${hexDataLaw[3].M}${hexDataLaw[3].L}${hexDataLaw[3].T}${hexDataLaw[3].I}`;
			document.getElementById("lawMLTI").innerHTML = keyArray.sort();
			drawParallelogram(clickedHexagonsCoords, "red");
			document.getElementById("lawName").value = "";
			document.getElementById("lawType").value = "";
		} else {
			hexDataLaw = clickedHexagons.map(hex => getHexData(hex));
			alert(`Закономерности\n${hexDataLaw[0].name} * ${hexDataLaw[2].name} = ${hexDataLaw[1].name} * ${hexDataLaw[3].name}\nне существует!`);
		}

		clickedHexagons.forEach(hexElement => Deactivate(hexElement))
		clickedHexagons = []
		drawingParallelogram = false
	}
}

function showRedactFormWithParams(gk) {
	//document.getElementById("form").classList.remove("invisible")
	ltPow = getPowFromLTGK(gk.LT)
	gkPow = getPowFromLTGK(gk.GK)
	writeIntoInput(ltPow[0],"LLT")
	writeIntoInput(ltPow[2],"TLT")
	writeIntoInput(gkPow[1],"GGK")
	writeIntoInput(gkPow[3],"KGK")


	writeIntoInputFromObject(gk,"name","name")
	writeIntoInputFromObject(gk,"ed_izm","unit_full")
	writeIntoInputFromObject(gk,"usl_ob","symbol")
	writeIntoInputFromObject(gk,"ob_ed_izm","unit")
	writeIntoInputFromObject(gk,"M","M")
	writeIntoInputFromObject(gk,"L","L")
	writeIntoInputFromObject(gk,"T","T")
	writeIntoInputFromObject(gk,"I","I")
}

let redactHexElement

document.getElementById("l1").onclick = function(){
	redactHexElement = getMainHexFromSiblings(ContextElement.target)
	if (redactHexElement == undefined) {return}
	gk = getHexData(redactHexElement)
	showRedactFormWithParams(gk)
	menu.classList.remove("active")
}

function finRedact() {
  ltInput = replacePowNumbersBtoS(`L${getFromInput("LLT")}T${getFromInput("TLT")}`)
	gkInput = replacePowNumbersBtoS(`G${getFromInput("GGK")}K${getFromInput("KGK")}`)
	newRedactHexElement = findHex(ltInput)

	arrayGK = findGK(newRedactHexElement,gkInput)
	gk = getHexData(redactHexElement)
	//console.log(data["row5"]["L⁰T⁰"])
	deleteHexGK(gk)
	gk = arrayGK[Object.keys(arrayGK)]
	writeFromForm(gk)
	//console.log(data["row5"]["L⁰T⁰"])
	sortGK(data);
	createTable("newf", data);
	
	localStorage.setItem('testObject', JSON.stringify(data));
	ReplacingSteps(data);
	//store(data);
}

function addLaw() {
	let element = {
		name: document.getElementById("lawName").value,
		config: document.getElementById("lawConfig").innerHTML,
		formula: document.getElementById("lawFormula").innerHTML
	}
	key = document.getElementById("lawMLTI").innerHTML;
	let chselect = document.getElementById("lawType").value;
	if (data.laws[chselect][key] === undefined) {
		data.laws[chselect][key] = element;
		alert("Закон сохранен");
	}
	else {alert('Данный закон уже существует') }
	
	localStorage.setItem('testObject', JSON.stringify(data));
}

function showLaws() {
	document.getElementById('laws').innerHTML = '';
	change = { 'force': 'Силовые соотношения', 'magn': 'Магнитное поле', 'gravity': 'Гравитационные законы', 'electro': 'Электромагнитные закономерности', 'kkv': 'Соотношения ККВ' };
	for (let type in data.laws) {
		let h = document.createElement('h3');
		h.innerHTML = change[type];
		let ul = document.createElement("ul");
		for (let law in data.laws[type]) {
			let li = document.createElement('li');
			let pre = document.createElement('pre');
			pre.innerHTML = `${data.laws[type][law].name}\n${data.laws[type][law].config}\n${data.laws[type][law].formula}`;
			li.appendChild(pre);
			//li.innerHTML = `${data.laws[type][law].name} -> ${data.laws[type][law].config} -> ${data.laws[type][law].formula}`;
			ul.appendChild(li);
		}
		document.getElementById('laws').appendChild(h);
		document.getElementById('laws').appendChild(ul);
	}
}


function writeFromForm(gk)  {
	//document.getElementById("form").classList.add("invisible")
	writeIntoObjFromInput(gk,"name","name")
	writeIntoObjFromInput(gk,"ed_izm","unit_full")
	writeIntoObjFromInput(gk,"usl_ob","symbol")
	writeIntoObjFromInput(gk,"ob_ed_izm","unit")
	writeIntoObjFromInput(gk,"M","M")
	writeIntoObjFromInput(gk,"L","L")
	writeIntoObjFromInput(gk,"T","T")
	writeIntoObjFromInput(gk,"I","I")
}

document.getElementById("l2").onclick = function(){
	//удалить 2 строки ниже
	//gkInput = getFromInput("GK")
	//ltInput = getFromInput("LT")

	//newRedactHexElement = findHex(ltInput)
	let delHexElement = getMainHexFromSiblings(ContextElement.target)
	gk = getHexData(delHexElement)
	deleteHexGK(gk)
	sortGK(data)
	createTable("newf",data)
	menu.classList.remove("active")

	localStorage.setItem('testObject', JSON.stringify(data));
}

function deleteHexGK(gk) {
	gk.name = ""
	gk.usl_ob = ""
	gk.M = 0
	gk.L = 0
	gk.T = 0
	gk.I = 0
	gk.ob_ed_izm = ""
	gk.ed_izm = ""
}

//не работает
//function showMenuLevels() {
//	document.getElementById('moreLevels').removeAttribute("hidden");
//}

document.getElementById("export").onclick = function (e) {
	fileName = document.getElementById("sota_filenm").value
	if (fileName == "") {
		alert('Заполните название файла около кнопки');
		return
		//fileName = "fviz"
	}
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));

  element.setAttribute('download', fileName + ".jsota")

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

fileSelector = document.getElementById('import')
fileSelector.addEventListener('change', (event) => {
	fileList = event.target.files
	reader = new FileReader()
  reader.addEventListener('load', (event) => {
    data = JSON.parse(event.target.result)
		createTable("newf",data)
  })
	reader.readAsText(fileList[0]);
	document.getElementById('sota_filenm').value = fileList[0].name.replace('.jsota','');
});



//function color_gk_input() {
//	var gk_colors = [{ 'G': 0, 'K': 0, color: "rgb(218, 218, 139)" }, { 'G': 1, 'K': 0, color: "rgb(194, 197, 200)" },
//	{ 'G': -1, 'K': 0, color: "rgb(69, 76, 80)" }, { 'G': 2, 'K': 0, color: "rgb(171, 170, 170)" },
//	{ 'G': 0, 'K': 1, color: "rgb(173, 207, 221)" }, { 'G': 1, 'K': 1, color: "rgb(182, 238, 182)" },
//	{ 'G': 1, 'K': 2, color: "rgb(247, 130, 134)" }, { 'G': 2, 'K': 2, color: "rgb(87, 174, 87)" },
//	{ 'G': 0, 'K': 1, color: "gb(111, 154, 233)" }, { 'G': 1, 'K': -1, color: "rgb(177, 203, 228)" },
//	{ 'G': 2, 'K': -1, color: "rgb(207, 223, 238)" }, { 'G': -1, 'K': -1, color: "rgb(39, 127, 56)" },
//	{ 'G': 0, 'K': -2, color: "rgb(91, 91, 180)" }, { 'G': -1, 'K': -2, color: "rgb(210, 166, 227)" }]

//	var g = document.getElementById("GGK")
//	var k = document.getElementById("KGK")

//	for (one in gk_colors) {
//		if (gk_colors[one]["G"] == g.value && gk_colors[one]["K"] == k.value) {
//			alert(gk_colors[one]["G"])
//			g.style.backgroundColor = gk_colors[one]["color"];
//		}
//	}
//}

