


function getNGK(hex,number) {
  return hex[number][Object.keys(hex[number])[0]]
}

function findGK(hex,reqGK) { 
  return hex.find(gk => Object.keys(gk) == reqGK)
}

function findGKIndex(hex,reqGK) { 
  return hex.indexOf(findGK(hex,reqGK))
}

//function convert

function findHex(lt) {

  ltArray = getPowFromLTGK(lt)
  console.log(lt)
  rowNumber = 5-(ltArray[0]+ltArray[2])
  console.log(rowNumber)
  return data[`row${rowNumber}`][lt]
}

function getPowFromLTGK(ltgk) {
  ltgkNum = replacePowNumbersStoB(ltgk)
  ltgkArray = []
  if (ltgkNum.match(/(L[\-\d]+)/mg) != null) {
    ltgkArray.push(ltgkNum.match(/(L[\-\d]+)/mg)[0])
  } else {ltgkArray.push("L0")}
  if (ltgkNum.match(/(G[\-\d]+)/mg) != null) {
    ltgkArray.push(ltgkNum.match(/(G[\-\d]+)/mg)[0])
  } else {ltgkArray.push("G0")}
  if (ltgkNum.match(/(T[\-\d]+)/mg) != null) {
    ltgkArray.push(ltgkNum.match(/(T[\-\d]+)/mg)[0])
  } else {ltgkArray.push("T0")}
  if (ltgkNum.match(/(K[\-\d]+)/mg) != null) {
    ltgkArray.push(ltgkNum.match(/(K[\-\d]+)/mg)[0])
  } else {ltgkArray.push("K0")}
  ltgkArray = ltgkArray.map(val => parseInt(val.slice(1)))
  return ltgkArray
}
// ⁰,⁻¹,⁻²,⁻³,⁻⁴,⁻⁵,⁻⁶,⁻⁷,⁻⁸,⁻⁹ 

function replacePowNumbersBtoS(string) {
  return string.replace(/0/g,"⁰").replace(/1/g,"¹").replace(/2/g,"²").replace(/3/g,"³").replace(/4/g,"⁴").replace(/5/g,"⁵")
               .replace(/6/g,"⁶").replace(/7/g,"⁷").replace(/8/g,"⁸").replace(/9/g,"⁹").replace(/-/g,"⁻")
}

function replacePowNumbersStoB(string) {
  return string.replace(/⁰/g,"0").replace(/¹/g,"1").replace(/²/g,"2").replace(/³/g,"3").replace(/⁴/g,"4").replace(/⁵/g,"5")
               .replace(/⁶/g,"6").replace(/⁷/g,"7").replace(/⁸/g,"8").replace(/⁹/g,"9").replace(/⁻/g,"-")
}

function getMLT(hex) {
  mlti = ""
  if (hex.M == 1) {
    mlti += `M`
  } else if (hex.M != 0) {
    mlti += `M${hex.M}`
  }
  if (hex.L == 1) {
    mlti += `L`
  } else if (hex.L != 0) {
    mlti += `L${hex.L}`
  }  
  if (hex.T == 1) {
    mlti += `T`
  } else if (hex.T != 0) {
    mlti += `T${hex.T}`
  }  
  if (hex.I == 1) {
    mlti += `I`
  } else if (hex.I != 0) {
    mlti += `I${hex.I}`
  }
  return replacePowNumbersBtoS(mlti)
}

menu = document.querySelector(".context-menu__items");
gkmenu = document.querySelector(".gkcontext-menu__items")

function getHexData(hex) {
  return getNGK(data[hex.parentElement.id][hex.id],0)
}


function getMainHexFromSiblings(element) {
  while (!element.classList.contains("one-hexagon") ) {
    if (element.parentElement == undefined) {
      return undefined
    }
    element = element.parentElement
  }
  return element
}

function writeIntoObjFromInput(object,field,id) {
  val = getFromInput(id)
	object[field] = val
}

function writeIntoInputFromObject(object,field,id) {
  writeIntoInput(object[field],id)
}

function writeIntoInput(field,id) {
	input = document.getElementById(id)
  val = field
  if (typeof val == "string") {
    val = replacePowNumbersStoB(val)
  }
	input.value = val
}

function getFromInput(id) {
  input = document.getElementById(id)
  val = input.value
  if (input.getAttribute('type') != "number") {
    val = replacePowNumbersBtoS(val)
    }
  return val
}

function getHexCanvasCoords(hex) {
  let inside = hex.querySelector(".inside");
	let headerHeight = document.getElementById("my-canvas").getBoundingClientRect().top;
	let position = inside.getBoundingClientRect();
	xCenter = (position.left + position.right) / 2;
	yCenter = (position.top + position.bottom) / 2 - headerHeight;
	return {x: xCenter, y: yCenter}
}

let c = document.getElementById("my-canvas");
let ctx = c.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = 1000;
function drawParallelogram(points,color) {
	
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) // очистить

	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;
	ctx.moveTo(points[0].x, points[0].y)
	points.forEach(function (point) {
		ctx.lineTo(point.x, point.y);
	})
  if (points.length == 4) {
    	ctx.lineTo(points[0].x, points[0].y);
  }

	ctx.stroke();
	
}

function checkParallelogram(hexArray) {

  
  hexData = hexArray.map(hex => getHexData(hex))
  console.log(hexData)
  let mlti1 = {
    M:hexData[0].M+hexData[2].M,
    L:hexData[0].L+hexData[2].L,
    T:hexData[0].T+hexData[2].T,
    I:hexData[0].I+hexData[2].I,
  }
  let mlti2 = {
    M:hexData[1].M+hexData[3].M,
    L:hexData[1].L+hexData[3].L,
    T:hexData[1].T+hexData[3].T,
    I:hexData[1].I+hexData[3].I,
  }
  return JSON.stringify(mlti2) == JSON.stringify(mlti1) // такая проверка на то что объекты одинаковы
}