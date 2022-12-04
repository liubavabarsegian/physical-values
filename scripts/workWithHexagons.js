
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

drawingParallelogram = false
clickedHexagons = [];
function rememberHexagon(hex) {

	hexCoords = getHexCanvasCoords(hex)

	clickedHexagons.push(hex);
	
	console.log(clickedHexagons)
	drawingParallelogram = true
	//console.log(hex)
	if (clickedHexagons.length == 4) {
		if (checkParallelogram(clickedHexagons)) {
			clickedHexagonsCoords = clickedHexagons.map(hexagon => getHexCanvasCoords(hexagon));
			document.getElementById("lowOpen").click();
			hexDataLow = clickedHexagons.map(hex => getHexData(hex));
			document.getElementById("lowConfig").innerHTML = `${hexDataLow[0].name} * ${hexDataLow[2].name} = ${hexDataLow[1].name} * ${hexDataLow[3].name}`;
			document.getElementById("lowFormula").innerHTML = `${hexDataLow[0].usl_ob} * ${hexDataLow[2].usl_ob} = ${hexDataLow[1].usl_ob} * ${hexDataLow[3].usl_ob}`;
			drawParallelogram(clickedHexagonsCoords, "red");
		} else {
			hexDataLow = clickedHexagons.map(hex => getHexData(hex));
			alert(`Закономерности\n${hexDataLow[0].name} * ${hexDataLow[2].name} = ${hexDataLow[1].name} * ${hexDataLow[3].name}\nне существует!`);
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

	writeIntoInputFromObject(gk,"LT","LT")
	writeIntoInputFromObject(gk,"GK","GK")
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
	createTable("newf",data)
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
}

document.getElementById("l2").onclick = function(){
	gkInput = getFromInput("GK")
	ltInput = getFromInput("LT")
	//newRedactHexElement = findHex(ltInput)
	let delHexElement = getMainHexFromSiblings(ContextElement.target)
	gk = getHexData(delHexElement)
	deleteHexGK(gk)
	sortGK(data)
	createTable("newf",data)
	menu.classList.remove("active")
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





