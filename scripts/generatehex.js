
createTable("newf",data)

function createTable(id,tableData) {
  Ntable = document.getElementById(id)
  Ntable.innerHTML = ""
  for (let row in tableData) {
    Ntable.appendChild(createRow(tableData[row],row))
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
  if (hexData.name == "") {
    newHex.classList.add("invisible")
  }
  leftTriangle = document.createElement("div")
  leftTriangle.classList.add("triangleLeft",`hexagon-${hexData.color}`)
  rightTriangle = document.createElement("div")
  rightTriangle.classList.add("triangleRight",`hexagon-${hexData.color}`)
  hexText = document.createElement("div")
  hexText.classList.add("inside",hexData.color)
  label = document.createElement("p")
  label.innerHTML = `${hexData.name}, ${hexData.ob_ed_izm}`
  mlt2 = document.createElement("p")
  mlt2.innerHTML = getMLT(hexData)
  hexText.appendChild(label)
  hexText.appendChild(mlt2)
  newHex.appendChild(leftTriangle)
  newHex.appendChild(hexText)
  newHex.appendChild(rightTriangle)

  return newHex
}



