const createUndoableCounter = () => {
	let history = [JSON.stringify(data)];
	let position = 0;

	return {

		value() {
			return JSON.parse(history[position]);
		},

		setValue(value) {
			if (position < history.length - 1) {
				history = history.slice(0, position + 1);
			}
			history.push(JSON.stringify(value));
			position += 1;
		},

		goBack() {
			if (position > 0) {
				position -= 1;
				data = this.value()
				sortGK(data);
				createTable("newf", data);
			}
			else { alert('Больше назад нельзя'); }
		},

		goForward() {
			if (position < history.length - 1) {
				position += 1;
				data = this.value()
				sortGK(data);
				createTable("newf", data);
			}
			else { alert('Больше вперед нельзя'); }
		}
	}
}
const undoableCounter = createUndoableCounter();

document.addEventListener("click", event => {
	if (event.button !== 2) { menu.classList.remove("active"); gkmenu.classList.remove("active")}
}, false)

menu.addEventListener("click", event => {
		event.stopPropagation();
}, false);


function Activate(hex) {
	console.log(hex)
	let inside = hex.querySelector(".inside");
	console.log(inside)
	inside.classList.add("active-hexagon")
	console.log(inside)

}

function Deactivate(hex) {
	let inside = hex.querySelector(".inside");
	inside.classList.remove("active-hexagon")
}

document.addEventListener("keydown", (event) => {
	if (event.keyCode == 27) {
		if (clickedHexagons.length > 0) {
			clickedHexagons.forEach(hexElement => Deactivate(hexElement));
			clickedHexagons = [];
		}
		if (currentShownLaw.hexes) {
			hexagons = currentShownLaw.hexes.map(hex => document.getElementById(hex))
			hexagons.forEach(hex => Deactivate(hex))
		}
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
})

drawingParallelogram = false
clickedHexagons = [];
// This is just an example of a law, it is not a real one.
let currentLaw = {
	name: "name",
	type: "force",
	equationInTerms: "Площ * Площ = Площ * Площ",
	equationInLetters: "A * B = C * D",
	hexes: [],
	hexesGK: [],
	id: "", // это id каждого hexa записанные подряд
};
let currentShownLaw = {}
function rememberHexagon(hex) {

	hexCoords = getHexCanvasCoords(hex)

	clickedHexagons.push(hex);
	
	drawingParallelogram = true
	//console.log(hex)
	if (clickedHexagons.length == 3) {
		tempclickedHexagons = [clickedHexagons[0], clickedHexagons[1], clickedHexagons[2], clickedHexagons[1]];
		if (checkParallelogram(tempclickedHexagons)) {
			clickedHexagonsCoords = tempclickedHexagons.map(hexagon => getHexCanvasCoords(hexagon));
			document.getElementById("lawOpen").click(); // someone pls fix this line 
			hexDataLaw = tempclickedHexagons.map(hex => getHexData(hex));
			currentLaw = {
				name: null,
				type: null,
				equationInTerms: `${hexDataLaw[0].name} * ${hexDataLaw[2].name} = (${hexDataLaw[1].name})²`,
				equationInLetters: `${hexDataLaw[0].usl_ob} * ${hexDataLaw[2].usl_ob} = (${hexDataLaw[1].usl_ob})²`,
				hexes: tempclickedHexagons.map(hex => hex.id),
				hexesGK: hexDataLaw.map(hexData => hexData.GK),
				id: hexDataLaw.map(hex => `${hex.LT}${hex.GK}`).sort().join('')
			};
			document.getElementById("lawConfig").innerHTML = currentLaw.equationInTerms;
			document.getElementById("lawFormula").innerHTML = currentLaw.equationInLetters;
			drawParallelogram(clickedHexagonsCoords, "red");
			document.getElementById("lawName").value = "";
			document.getElementById("lawType").value = "";
			document.getElementById("addorchangelaw").innerHTML = "Добавить"
			foundLaw = getLaw(currentLaw)
			if (foundLaw) {

				writeIntoInput(foundLaw.name,"lawName")
				writeIntoInput(foundLaw.type,"lawType")
				document.getElementById("addorchangelaw").innerHTML = "Изменить"
			}
		}
	}
	if (clickedHexagons.length == 4) {
		if (checkParallelogram(clickedHexagons)) {
			clickedHexagonsCoords = clickedHexagons.map(hexagon => getHexCanvasCoords(hexagon));
			document.getElementById("lawOpen").click(); // and this one too
			hexDataLaw = clickedHexagons.map(hex => getHexData(hex));
			currentLaw = {
				name: null,
				type: null,
				equationInTerms: `${hexDataLaw[0].name} * ${hexDataLaw[2].name} = ${hexDataLaw[1].name} * ${hexDataLaw[3].name}`,
				equationInLetters: `${hexDataLaw[0].usl_ob} * ${hexDataLaw[2].usl_ob} = ${hexDataLaw[1].usl_ob} * ${hexDataLaw[3].usl_ob}`,
				hexes: clickedHexagons.map(hex => hex.id),
				hexesGK: hexDataLaw.map(hexData => hexData.GK),
				id: hexDataLaw.map(hex => `${hex.LT}${hex.GK}`).sort().join('')
			};
			document.getElementById("lawConfig").innerHTML = currentLaw.equationInTerms;
			document.getElementById("lawFormula").innerHTML = currentLaw.equationInLetters;
			drawParallelogram(clickedHexagonsCoords, "red");
			document.getElementById("lawName").value = "";
			document.getElementById("lawType").value = "";
			document.getElementById("addorchangelaw").innerHTML = "Добавить"
			foundLaw = getLaw(currentLaw)
			if (foundLaw) {
				writeIntoInput(foundLaw.name,"lawName")
				writeIntoInput(foundLaw.type,"lawType")
				document.getElementById("addorchangelaw").innerHTML = "Изменить"
			}
		} else {
			hexDataLaw = clickedHexagons.map(hex => getHexData(hex));
			alert(`Закономерности\n${hexDataLaw[0].name} * ${hexDataLaw[2].name} = ${hexDataLaw[1].name} * ${hexDataLaw[3].name}\nне существует!`);
			clickedHexagons.forEach(hexElement => Deactivate(hexElement));
			clickedHexagons = [];
			drawingParallelogram = false;
		}
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
	deleteHexGK(gk)
	gk = arrayGK[Object.keys(arrayGK)]
	writeFromForm(gk)
	sortGK(data);
	createTable("newf", data);
	
	localStorage.setItem('testObject', JSON.stringify(data));
	undoableCounter.setValue(data);
}

function addLaw() {
	// clickedHexagons
	currentLaw.name = document.getElementById("lawName").value
	currentLaw.type = document.getElementById("lawType").value

	prewLaw = getLaw(currentLaw)
	if (prewLaw) {
		delete data.laws[prewLaw.type][prewLaw.id]
	}
	if (data.laws[currentLaw.type][currentLaw.id] === undefined) {
		data.laws[currentLaw.type][currentLaw.id] = currentLaw;
		alert("Закон сохранен");

	}
	else { alert('Данный закон уже существует') }
	currentLaw = {}

	localStorage.setItem('testObject', JSON.stringify(data));
}

function getLaw(law) {
	for (type in data.laws) {
		if (data.laws[type][law.id] != undefined) {
			return data.laws[type][law.id]
    }
	}
	return false
}

function showLaws() {
	document.getElementById('laws').innerHTML = '';
	change = { 'force': 'Силовые соотношения', 'mech': 'Законы механики', 'magn': 'Магнитное поле', 'gravity': 'Гравитационные законы', 'electro': 'Электромагнитные закономерности', 'kkv': 'Соотношения ККВ' };
	for (let type in data.laws) {
		let h = document.createElement('h3');
		h.innerHTML = change[type];
		let ul = document.createElement("ul");
		for (let law in data.laws[type]) {
			let li = document.createElement('li');
			let pre = document.createElement('pre');
			pre.innerHTML = `${data.laws[type][law].name}\n${data.laws[type][law].equationInTerms}\n${(data.laws[type][law].equationInLetters).italics()}`;
			pre.addEventListener('click', function (e) {

				currentShownLaw = data.laws[type][law]
				drawLaw(currentShownLaw)
			});
			li.appendChild(pre);
			//li.innerHTML = `${data.laws[type][law].name} -> ${data.laws[type][law].config} -> ${data.laws[type][law].formula}`;
			ul.appendChild(li);
		}
		document.getElementById('laws').appendChild(h);
		document.getElementById('laws').appendChild(ul);
	}
}

function drawLaw(law) {
	hexagons = law.hexes.map(hex => document.getElementById(hex))
	hexagonsGK = law.hexesGK
	hexagonsData = hexagons.map(hex => getHexFullData(hex))
	hexagonsCoords = hexagons.map(hex => getHexCanvasCoords(hex))
	console.log(hexagons)
	hexagonsData.forEach(function (hexData, i) {
    swap = hexData[findGKIndex(hexData,hexagonsGK[i])]
		hexData[findGKIndex(hexData,hexagonsGK[i])] = hexData[0]
		hexData[0] = swap
	});
	createTable("newf", data)
	hexagons = law.hexes.map(hex => document.getElementById(hex))
	hexagons.forEach(hex => Activate(hex))
	currentShownLaw = law
	// findGK(hex,reqGK)
	drawParallelogram(hexagonsCoords, "red");
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

	//newRedactHexElement = findHex(ltInput)
	let delHexElement = getMainHexFromSiblings(ContextElement.target)
	gk = getHexData(delHexElement)
	deleteHexGK(gk)
	sortGK(data)
	createTable("newf",data)
	menu.classList.remove("active")

	localStorage.setItem('testObject', JSON.stringify(data));
	undoableCounter.setValue(data);
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
