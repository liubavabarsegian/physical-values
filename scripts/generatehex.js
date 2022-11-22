let currentGK = "G⁰K⁰"
createTable("newf",data,currentGK)

function createTable(id,tableData,gk) {
  Ntable = document.getElementById(id)
  for (let row in tableData) {
    Ntable.appendChild(createRow(tableData[row],gk,row))
  }
}

function createRow(rowData,gk,rowName) {
  newRow = document.createElement("div")
  newRow.classList.add("row")
  newRow.setAttribute("id",rowName)
  for (let hex in rowData) {
    newRow.appendChild(createHexagon(findGK(rowData[hex],gk)[gk],hex))
  }
  return newRow
}

function findGK(hex,reqGK) { 
  return hex.find(gk => Object.keys(gk) == reqGK)
}

function createHexagon(hexData,name) {
  newHex = document.createElement("div")
  newHex.setAttribute("data-level",hexData.color)
  newHex.setAttribute("id",name)
  newHex.classList.add("one-hexagon","menu")
  if (hexData.name == "") {
    newHex.classList.add("empty")
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
  } else if (hex.M != 0) {
    mlti += `I${hex.M}`
  }
  return replacePowNumbers(mlti)
}

// ⁰,⁻¹,⁻²,⁻³,⁻⁴,⁻⁵,⁻⁶,⁻⁷,⁻⁸,⁻⁹ 

function replacePowNumbers(string) {
  return string.replace(/0/g,"⁰").replace(/1/g,"¹").replace(/2/g,"²").replace(/3/g,"³").replace(/4/g,"⁴").replace(/5/g,"⁵")
               .replace(/6/g,"⁶").replace(/7/g,"⁷").replace(/8/g,"⁸").replace(/9/g,"⁹").replace(/-/g,"⁻")
}

