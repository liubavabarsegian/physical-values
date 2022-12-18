sortGK(data)
createTable("newf",data)

// Array.prototype.swapsss = function (x,y) {
//   var b = this[x];
//   this[x] = this[y];
//   this[y] = b;
//   return this;
// }
// почему-то эта функция ломает проект

let ContextElement
function addHexEventListeners() {
  menuArea = document.querySelectorAll(".one-hexagon");

	for (hex of menuArea) {

		hex.addEventListener("contextmenu", function(event) {
				event.preventDefault();
      	menu.style.top = `${event.clientY}px`;
				menu.style.left = `${event.clientX}px`;
				menu.classList.add("active");
				gkmenu.classList.add("active");
				gkmenu.style.top = `${event.clientY}px`;
				gkmenu.style.left = `${event.clientX+175}px`;
				ContextElement = event
				hex = getMainHexFromSiblings(ContextElement.target)
				if (hex == undefined) {return}

        hexData = findHex(hex.id)
        gkmenu.innerHTML = ""
        hexData.forEach(function (gk,index) {
          gk = getNGK(hexData,index)
          if (gk.name != "" && gk.name != getNGK(hexData,0).name) {
            let gkLiMenu = document.createElement("li")
            gkLiMenu.classList.add("context-menu__item")
            let gkAMenu = document.createElement("a")
            gkAMenu.classList.add("context-menu__link")
            gkAMenu.innerHTML = gk.name
            gkLiMenu.appendChild(gkAMenu)
            gkLiMenu.addEventListener("click", function() {

              swap = hexData[findGKIndex(hexData,gk.GK)]
              hexData[findGKIndex(hexData,gk.GK)] = hexData[0]
              hexData[0] = swap

                createTable("newf", data);
                localStorage.setItem('testObject', JSON.stringify(data));
                //undoableCounter.setValue(data); - убрать комментарий, если необходимо возвращаться к старым уровням(плохо работает)
            })
            gkmenu.appendChild(gkLiMenu)
          }
        })

            if (hex.classList.contains("invisible")) {
                document.getElementById("l0").style.display = "none"
					document.getElementById("l1a").innerHTML = "Добавить"
					document.getElementById("l2").style.display = "none"
            } else {
                document.getElementById("l0").style.display = ""
					document.getElementById("l1a").innerHTML = "Редактировать"
					document.getElementById("l2").style.display = ""
				}
		});
	
	hex.addEventListener("click", function() {
			if (!this.querySelector(".inside").classList.contains("active-hexagon")) {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    Activate(this)
			rememberHexagon(this);
        
			} 			
	});
  
    hex.addEventListener("mouseover", function(event) {

        //не убирать
        let hexElement = event.target

        //вывод в нижние окна
        document.getElementById("outLT").value = getNGK(findHex(getMainHexFromSiblings(hexElement).id), 0).LT;
        document.getElementById("outGK").value = getNGK(findHex(getMainHexFromSiblings(hexElement).id), 0).GK;
        //--------------------------

        let futureClickedHexagons = clickedHexagons.slice()
        futureClickedHexagons.push(getMainHexFromSiblings(hexElement))
        futureClickedHexagonsCoords = futureClickedHexagons.map(hexagon => getHexCanvasCoords(hexagon))

        if (drawingParallelogram) {
        drawParallelogram(futureClickedHexagonsCoords,"yellow")
        }
      
      			
    });


	}
}

function sortGK(tableData) {
    for (let row in tableData) {
        if (row != 'laws') {
            for (let hex in tableData[row]) {
                if (findFirstNotEmptyNumber(tableData[row][hex]) != null) {
                    firstNonEmptyGK = findFirstNotEmptyNumber(tableData[row][hex])
                    firstGK = 0
                    swap = tableData[row][hex][firstGK]
                    tableData[row][hex][firstGK] = tableData[row][hex][firstNonEmptyGK]
                    tableData[row][hex][firstNonEmptyGK] = swap
                }
            }
        }
    }
}

function findFirstNotEmptyNumber(hex) {
  for (let gk in hex) {
    if (getNGK(hex,gk).name != "") {
      return gk
    }
  }
  return null
}

function createTable(id,tableData) {
  Ntable = document.getElementById(id)
  Ntable.innerHTML = ""
    for (let row in tableData) {
        if (row != 'laws') {
            Ntable.appendChild(createRow(tableData[row], row))
        }
    }
  addHexEventListeners()
}

function createRow(rowData,rowName) {
  newRow = document.createElement("div")
  newRow.classList.add("row")
  newRow.setAttribute("id",rowName)
  for (let hex in rowData) {
    //console.log(rowData[hex][0][Object.keys(rowData[hex][0])[0]])
    newRow.appendChild(createHexagon(getNGK(rowData[hex],0),hex))
  }
  return newRow
}



function createHexagon(hexData,name) {
  newHex = document.createElement("div")
  newHex.setAttribute("data-level",hexData.color)
  newHex.setAttribute("id",name)
  newHex.classList.add("one-hexagon","menu")

  leftTriangle = document.createElement("div")
  leftTriangle.classList.add("triangleLeft",`hexagon-${hexData.color}`,"hexagon_zero", "hexagon_triangle_left", "hexagon_triangle_left_large")
  rightTriangle = document.createElement("div")
  rightTriangle.classList.add("triangleRight",`hexagon-${hexData.color}`, "hexagon_zero", "hexagon_triangle_right", "hexagon_triangle_right_large")
  hexText = document.createElement("div")
  hexText.classList.add("inside",hexData.color)

  if (hexData.name == "") {
    newHex.classList.add("invisible")
  }
  label = document.createElement("p")
  label.innerHTML = `${hexData.name}`
  hexText.appendChild(label)
/*    if (hexData.ob_ed_izm != "" && hexData.usl_ob != "") {*/
if (hexData.usl_ob != "") {
    symbolMeasure = document.createElement("p")
      symbolMeasure.innerHTML = `${hexData.usl_ob}, ${hexData.ob_ed_izm}`
    hexText.appendChild(symbolMeasure)
  }
  mlt2 = document.createElement("p")
  mlt2.innerHTML = getMLT(hexData)
  hexText.appendChild(mlt2)
  newHex.appendChild(leftTriangle)
  newHex.appendChild(hexText)
  newHex.appendChild(rightTriangle)

  return newHex
};






