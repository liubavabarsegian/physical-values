sortGK(data)
createTable("newf", data)

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
    //hex.hidden = false;
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
              gkLiMenu.addEventListener("click", function () {

              
              swap = hexData[findGKIndex(hexData,gk.GK)]
              // console.log(findGKIndex(hexData,gk.GK))
              hexData[findGKIndex(hexData,gk.GK)] = hexData[0]
              hexData[0] = swap


                createTable("newf", data);
                localStorage.setItem('testObject', JSON.stringify(data));
                undoableCounter.setValue(data);
            })
              gkmenu.appendChild(gkLiMenu);
          }
          
        })


            if (hex.classList.contains("invisible")) {
                document.getElementById("l0").style.display = "none"
					document.getElementById("l1a").innerHTML = "Добавить"
					document.getElementById("l2").style.display = "none"
            }
            else {
                document.getElementById("l0").style.display = ""
					document.getElementById("l1a").innerHTML = "Редактировать"
					document.getElementById("l2").style.display = ""
			}
      if (checkAnyGKExistence(getHexFullData(hex)) && getHexData(hex).name != "") {

          let li = document.createElement("li");
          li.classList.add("context-menu__item");
          let a = document.createElement("a");
          a.classList.add("context-menu__link");
          a.style.backgroundColor = '#000000';
          a.style.color = '#FFFFFF';
          a.innerHTML = "Скрыть 👁";

        a.addEventListener('click', function() {
          emptyIndex = getEmptyGKIndex(hexData)
          // hexGK[Object.keys(hexGK)[0]].name
          let swap = data[hex.parentElement.id][hex.id][0]
          data[hex.parentElement.id][hex.id][0] = data[hex.parentElement.id][hex.id][emptyIndex]
          data[hex.parentElement.id][hex.id][emptyIndex] = swap
          createTable("newf", data)
        })

        li.appendChild(a)
        gkmenu.appendChild(li)

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
    symbolMeasure = document.createElement("i")
    if (hexData.M == 0 & hexData.L == 0 & hexData.T == 0 & hexData.I == 0 & hexData.name != "" & hexData.LT == 'L⁰T⁰') { symbolMeasure.innerHTML = '1' }
    else { symbolMeasure.innerHTML = `${hexData.usl_ob.split(/[{}]/)[0]}${(hexData.usl_ob.split(/[{}]/)[1]) ? (hexData.usl_ob.split(/[{}]/)[1].fontsize(1)) : ''}${(hexData.usl_ob.split(/[{}]/)[2]) ? (hexData.usl_ob.split(/[{}]/)[2]) : ''}, ${hexData.ob_ed_izm}` }
    hexText.appendChild(symbolMeasure)
  }
  mlt2 = document.createElement("b")
  mlt2.innerHTML = getMLT(hexData)
  hexText.appendChild(document.createElement("br"))
  hexText.appendChild(mlt2)
  newHex.appendChild(hexText)

  return newHex
};





