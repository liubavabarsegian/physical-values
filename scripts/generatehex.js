sortGK(data)
createTable("newf",data)

function sortGK(tableData) {
  for (let row in tableData) {
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
  if (hexData.ob_ed_izm != "" && hexData.usl_ob != "") {
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







